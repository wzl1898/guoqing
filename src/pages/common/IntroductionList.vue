<template>
  <div class="list_container">
    <IntroductionItem
      v-for="item in introductionInfo"
      :key="item.label"
      class="list_container_item"
      :label="item.label"
      :value="item.value"
      :is-hover="isHover"
      @click.native="handleClickItem(item)"
    />
  </div>
</template>

<script>
import IntroductionItem from './IntroductionItem'

export default {
  name: 'IntroductionList',
  components: {
    IntroductionItem
  },
  props: {
    introductionInfo: {
      type: Array,
      required: true
    },
    isHover: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * @event: click.native
     * 点击其中一项
     * @param {object} item 点击项的信息
     */
    handleClickItem (item) {
      console.log(item)
      console.log(item)
      console.log(item)
      console.log(item)
      console.log(item)
      console.log(item)
      this.$emit('click-item', item)
    }
  }
}
</script>

<style scoped lang="scss">
.list_container {
  display: flex;
  flex-wrap: wrap;

  &_item {
    width: calc((100% - 60px) / 3);
    margin-right: 30px;

    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
</style>
