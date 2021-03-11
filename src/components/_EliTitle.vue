<template>
  <p class="title">
    {{ title }}
    <template v-if="detail">
      -
      <span class="title_detail"> {{ detail }}</span>
    </template>
  </p>
</template>

<script>
export default {
  name: 'EliTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    detail: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: 700;
  color: $eli-title-color;

  &_detail {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
