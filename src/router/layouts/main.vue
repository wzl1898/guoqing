<script>
import NavBar from '@components/nav-bar'
import NavAside from '@components/nav-aside'

export default {
  components: { NavBar, NavAside },
  data () {
    return {
      routing: this.$store.state.stateRouting.currentRouting
        ? this.$store.state.stateRouting.currentRouting.item.menuTree.childList
        : undefined,
      item: undefined
    }
  },
  methods: {
    handleNavChange (item) {
      this.item = item.childList
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
  }
}
</script>

<template>
  <el-container class="elContainerBox">
    <div :class="$style.container">
      <el-header
        class="elHeader"
        height="60px"
      >
        <NavBar
          :routingpop="routing"
          @theCurrentMenu="handleNavChange"
        />
      </el-header>

      <el-container class="elContainer">
        <el-aside width="200px">
          <NavAside
            class="navAside"
            :routing-msg="item"
          />
        </el-aside>

        <el-main
          class="elMain"
          style="overflow: hidden;"
        >
          <router-view :key="$route.fullPath" />
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>

<style lang="scss" module>
@import '@design';

.container {
  width: 100%;
  min-width: $size-content-width-min;
  // max-width: $size-content-width-max;
  // margin: 0 auto;
}
</style>

<style lang="scss" scoped>
@import '@customStyle';

.elContainerBox {
  height: 100vh;
}

.elHeader {
  padding: 0;
  background: $tint-color-header;
}

.elContainer {
  overflow: hidden;
}

.navAside {
  height: 100%;
  min-height: calc(100vh - 60px);
  // background: $dark-color-background;
}

.elMain {
  padding: 0;
}
</style>
