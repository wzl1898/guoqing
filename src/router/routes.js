import store from '@store'

export default [
  // {
  //   path: '/',
  //   component: () => import('@pages/chart_editor')
  // },
  // {
  //   path: '/view/:id',
  //   name: 'view',
  //   component: () => import('../views/Viewer/Canvas.vue'),
  //   meta: {
  //     title: '大屏查看 | ChartFun'
  //   }
  // },
  {
    path: '/',
    name: 'home',
    component: () => lazyLoadView(import('@pages/home')),
    meta: {
      authRequired: true
    }
  },
  // {
  //   path: '/chart_editor',
  //   component: () => import('@pages/chart_editor/editor_tabs'),
  //   meta: {
  //     authRequired: true
  //   }
  // },
  // {
  //   path: '/chart_viewer',
  //   component: () => import('@pages/chart_editor/viewer')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@pages/login')),
    meta: {
      beforeResolve (routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({
            name: 'home'
          })
        } else {
          // Continue to the login page
          next()
        }
      }
    }
  },
  {
    path: '/',
    component: () => import('@layouts/main'),
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => lazyLoadView(import('@pages/profile')),
        meta: {
          authRequired: true
        },
        props: (route) => ({
          user: store.state.auth.currentUser || {}
        })
      },
      {
        path: '/guide_pages',
        name: 'guide',
        component: () => lazyLoadView(import('@pages/guide_pages')),
        meta: {
          authRequired: true
        }
      }
    ]
  },

  {
    path: '/profile/:username',
    name: 'username-profile',
    component: () => lazyLoadView(import('@pages/profile')),
    meta: {
      authRequired: true,
      beforeResolve (routeTo, routeFrom, next) {
        store
          // Try to fetch the user's information by their username
          .dispatch('users/fetchUser', {
            username: routeTo.params.username
          })
          .then((user) => {
            // Add the user to the route params, so that it can
            // be provided as a prop for the view component below.
            routeTo.params.user = user
            // Continue to the route.
            next()
          })
          .catch(() => {
            // If a user with the provided username could not be
            // found, redirect to the 404 page.
            next({
              name: '404',
              params: {
                resource: 'User'
              }
            })
          })
      }
    },
    // Set the user from the route params, once it's set in the
    // beforeResolve route guard.
    props: (route) => ({
      user: route.params.user
    })
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve (routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        // const authRequiredOnPreviousRoute = routeFrom.matched.some(
        //   (route) => route.meta.authRequired
        // )
        // // Navigate back to previous page, or home as a fallback
        // next(
        //   authRequiredOnPreviousRoute
        //     ? {
        //         name: 'home',
        //       }
        //     : {
        //         ...routeFrom,
        //       }
        // )
        window.location = '/'
      }
    }
  },
  {
    path: '/404',
    name: '404',
    // component: require('@views/_404').default,
    // // Allows props to be passed to the 404 page through route
    // // params, such as `resource` to define what wasn't found.
    // props: true,
    component: () => import('@layouts/main'),
    children: [
      {
        path: '/',
        component: () => lazyLoadView(import('@pages/_404')),
        props: true
      }
    ]
  }
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@pages/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@pages/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000
  })

  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    }
  })
}
