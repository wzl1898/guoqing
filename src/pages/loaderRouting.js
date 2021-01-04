import router from '@router'
import state from '@store'

function importQuick (path) {
  if (process.env.NODE_ENV === 'development') {
    return () =>
      import(/* webpackInclude: /\.vue$/,
           webpackChunkName: "development-dynamic-routers",
           webpackMode: "lazy-once" */
        '@pages/' + path) // 路由动态导入，为了支持快速热更新，将所有动态路由打包进一个chunk
  } else {
    return () =>
      import(/* webpackInclude: /\.vue$/,
           webpackChunkName: "[request]" */
        '@pages/' + path) // 根据路由名称分离打包chunk
  }
}

export default function initMenuRouting () {
  const routing = state.state.stateRouting.currentRouting.item.menuTree.childList
  const newRouting = [] // 新的routing
  routing.forEach((item) => {
    // 头部菜单
    if (item.childList) {
      flatRouter(item.childList, item, newRouting)
    }
  })

  const mainlayoutRouting = [
    {
      path: '/',
      component: () => import('@layouts/main'),
      children: newRouting
    }
  ]
  router.addRoutes(mainlayoutRouting)
}

function flatRouter (routerList, route, newRouting) {
  routerList.forEach((routerInfo) => {
    if (routerInfo.href && routerInfo.target) {
      const arrOption = {
        path: routerInfo.href,
        name: routerInfo.id,
        component: importQuick(routerInfo.target.replace(/\/$/, '')),
        meta: {
          ...routerInfo.meta,
          nav: route.vueRoute,
          authRequired: true
        },
        props: true
      }
      newRouting.push(arrOption)
    }
    if (routerInfo.childList) {
      flatRouter(routerInfo.childList, route, newRouting)
    }
  })
}
