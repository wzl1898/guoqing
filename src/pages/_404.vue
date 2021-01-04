<script>
import { authComputed } from '@store/helpers'

export default {
  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }]
  },

  props: {
    resource: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...authComputed
  },
  methods: {
    returnBack () {
      if (this.currentUser) {
        this.$router.go(-1)
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<template>
  <h1 :class="$style.title">
    404 错误
    <template v-if="resource">
      {{ resource }}
    </template>
    <h2>
      {{
        `该页面不存在，${currentUser ? '请确认拥有相应的权限' : '请登录后再试'}`
      }}
    </h2>
    <el-button @click="returnBack">
      返回
    </el-button>
  </h1>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>
