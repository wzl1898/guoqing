<template>
  <el-button
    :disabled="disabledState"
    v-bind="$attrs"
    v-on="listeners"
  >
    <BaseIcon
      v-if="loadingState && !noLoadingIcon"
      name="sync"
      spin
    />
    <slot v-else />
  </el-button>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noLoadingIcon: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    listeners () {
      // spread the listeners passed from the parent, but override the click one
      return {
        ...this.$listeners,
        click: this.handleClick
      }
    },
    loadingState () {
      return this.loading || this.isLoading
    },
    disabledState () {
      return this.disabled || this.isLoading
    }
  },
  methods: {
    async handleClick (e) {
      this.isLoading = true
      await this.$listeners.click(e).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
