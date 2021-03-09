<script>
import BaseIcon from '@components/_base-icon'
import { systemLog } from '@api/system'
import { getProjectTitle } from '@utils/'

export default {
  components: {
    BaseIcon
  },
  props: {
    routingMsg: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      // routingMsg: '',
    }
  },
  computed: {
    projectTitle () {
      return getProjectTitle()
    },
    userName () {
      const authInfo = JSON.parse(localStorage.getItem('auth.currentUser'))
      return authInfo.name
    }
  },
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {},
    logDaily (options) {
      const params = {
        title: options.name,
        type: 3,
        requestUri: options.target
      }
      systemLog(params).then((res) => {
        // console.log(res)
      })
    }
  }
}
</script>

<template>
  <div
    v-if="routingMsg !== ''"
    width="15vw"
  >
    <el-menu
      :default-active="$route.path"
      class="elMenuVertical"
      unique-opened
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <li class="logo_container">
        <el-image
          class="logo_container_image"
          :src="require('@assets/images/logo.png')"
        />
        <p class="logo_container_title">
          <span>{{ projectTitle }}</span>
          <span> {{ userName }}</span>
        </p>
        <el-button size="small">
          退出系统
        </el-button>
      </li>
      <el-submenu
        v-for="(item, index) in routingMsg"
        :key="index"
        class="elSubmenu"
        :index="index + ''"
      >
        <template slot="title">
          <BaseIcon
            class="iconStyle"
            :name="item.icon ? item.icon : 'camera'"
          />
          <span class="menuColor">{{ item.name }}</span>
        </template>

        <el-menu-item
          v-for="(option, index2) in item.childList"
          :key="index2"
          class="elMenuItem"
          :index="option.href"
          @click="logDaily(option)"
        >
          {{ option.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '@customStyle';

.iconStyle {
  margin: 0 5px;
  color: $tint-color;
}

.elMenuVertical {
  height: 100%;
  background: $dark-color-background;
  border-right: none;

  ::v-deep .el-submenu__title:hover,
  .el-submenu__title:focus {
    background-color: $dark-color-hover-background;
  }

  ::v-deep .el-menu {
    background-color: $dark-color-hover-aside;

    .el-menu-item:hover,
    .el-menu-item:focus {
      background-color: $dark-color-hover-background;
    }
  }

  // .elSubmenu :hover {
  //   background: $dark-color-hover-background;
  // }

  .menuColor {
    color: $tint-color;
  }

  .elMenuItem {
    color: $tint-color;
  }

  .elMenuItem.is-active {
    position: relative;
    color: $tint-color-background-header;
    background-color: $dark-color-hover-background;

    &::after {
      position: absolute;
      left: 0;
      width: 4px;
      height: 100%;
      content: '';
      background-color: $tint-color-background-header;
    }
  }
}

.logo_container {
  display: flex;
  flex-direction: column;
  align-items: center;

  &_image {
    width: 50%;
    height: 50%;
  }

  &_title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: $tint-color-background-header;
  }
}
</style>
