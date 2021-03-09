<script>
import { authComputed } from '@store/helpers'
import NavBarRoutes from './nav-bar-routes'
import { mapGetters } from 'vuex'
import { getProjectTitle } from '@utils/'

export default {
  components: { NavBarRoutes },
  props: {
    routingpop: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      // activeIndex: '/sys',
      persistentNavRoutes: [
        {
          name: 'home',
          title: ''
        }
      ],
      loggedInNavRoutes: [
        // {
        //   name: 'profile',
        //   title: () => '当前登录：' + this.currentUser.name,
        // },
        {
          name: 'logout',
          title: '退出'
        }
      ],
      loggedOutNavRoutes: [
        {
          name: 'login',
          title: '登录'
        }
      ],
      lastValue: 'system'
    }
  },
  computed: {
    ...authComputed,
    ...mapGetters('auth', ['currentUser']),
    currentNav () {
      return this.$route.meta.nav
    },
    projectTitle () {
      return getProjectTitle()
    }
  },
  watch: {
    currentNav: {
      handler (value) {
        if (value) {
          this.lastValue = value
        } else {
          value = this.lastValue
        }
        if (
          this.routingpop &&
          this.routingpop.find((item) => item.vueRoute === value)
        ) {
          this.$emit(
            'theCurrentMenu',
            this.routingpop.find((item) => item.vueRoute === value)
          )
        }
      },
      immediate: true
    }
  },
  methods: {
    sendMsg (msg) {
      this.$emit('theCurrentMenu', msg)
      // 点击navbar为挖掘的导航项 跳转至 创建流程页面
      if (msg.name === '挖掘') {
        this.$router.push('/projectldh/createprojectldh')
      }
    }
  }
}
</script>

<template>
  <div class="wrap nav_bar">
    <div class="box">
      <img
        class="logo_img"
        src="@assets/images/logo.png"
        alt="logo"
      >
      <span class="logo">{{ projectTitle }}</span>
      <el-menu
        :default-active="currentNav"
        class="el-menu-demo nav_bar"
        mode="horizontal"
        active-text-color="#ffffff"
        text-color="#fff"
      >
        <el-menu-item
          v-for="(item, index) in routingpop"
          :key="index"
          :index="item.vueRoute"
          class="el_menu_item"
          @click="sendMsg(item)"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>

    <div class="box userInfo">
      <span
        v-if="currentUser"
        class="fontColor"
      >当前登录： {{ currentUser.name }}</span>
      <ul :class="$style.container">
        <NavBarRoutes
          class="fontColor"
          :routes="persistentNavRoutes"
        />
        <NavBarRoutes
          v-if="loggedIn"
          class="fontColor"
          :routes="loggedInNavRoutes"
        />
        <NavBarRoutes
          v-else
          class="fontColor"
          :routes="loggedOutNavRoutes"
        />
      </ul>
    </div>
  </div>
</template>

<style lang="scss" module>
// @import '@design';

// .container {
//   padding: 0;
//   margin: 0 0 $size-grid-padding;
//   text-align: center;
//   list-style-type: none;

//   > li {
//     display: inline-block;
//     margin-right: $size-grid-padding;
//   }
// }
</style>

<style lang="scss" scoped>
@import '@customStyle';

.fontColor {
  color: #fff;
}

.wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
}

.elMenu {
  background-color: $tint-color-header !important;
}

.elMenuItem {
  background-color: $tint-color-header !important;
  border-bottom-color: $tint-color !important;

  &:hover {
    background-color: $tint-color-hover-header !important;
  }
}

.nav_bar {
  background-color: $dark-color-background;

  ::v-deep .el-menu-item:not(.is-disabled):hover,
  .el-menu-item:not(.is-disabled):focus {
    background-color: $dark-color-hover-background;
  }
}

.logo {
  display: inline-block;
  min-width: 110px;
  padding: 5px 10px;
  font-size: 20px;
  color: $tint-color;
}

.logo_img {
  width: 50px;
  height: 50px;
  margin-left: 20px;
}

.box {
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    line-height: 60px;
  }
}

.userInfo {
  ul {
    margin: 0;
    list-style-type: none;
  }

  li {
    float: left;
    margin: 0 20px;
  }

  li > a {
    line-height: 60px;
    color: $tint-color;
    text-decoration: none;
  }
}
</style>
