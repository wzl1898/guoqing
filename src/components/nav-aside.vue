<script>
import BaseIcon from '@components/_base-icon'
import { systemLog } from '@api/system'
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
    class="bg-color-box"
  >
    <el-menu
      :default-active="$route.path"
      class="elMenuVertical"
      unique-opened
      router
      @open="handleOpen"
      @close="handleClose"
    >
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

  .elSubmenu :hover {
    background: $dark-color-hover-background;
  }

  .menuColor {
    color: $tint-color;
  }

  .elMenuItem {
    color: $tint-color;
    background: $dark-color-hover-background;

    &:hover {
      background: $dark-color-hover-aside;
    }
  }

  .elMenuItem.is-active {
    color: $tint-color-hover-header;
  }
}
</style>
