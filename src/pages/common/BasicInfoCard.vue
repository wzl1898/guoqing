<template>
  <el-card
    class="card_container"
    shadow="hover"
  >
    <template #header>
      <p class="card_container_title">
        {{ title }}
      </p>
    </template>
    <slot />
    <div
      v-if="showState"
      class="card_container_flag"
    >
      不合格
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'BasicInfoCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    showState: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.card_container {
  position: relative;

  &_title {
    font-size: 16px;
    font-weight: 700;
    color: $eli-text-color;
  }

  &_flag {
    position: absolute;
    top: -120px;
    right: -240px;
    width: 400px;
    height: 50px;
    font-weight: bold;
    line-height: 50px;
    color: $tint-color-background-header;
    text-align: center;
    background-color: #df858e;
    transform: rotateZ(45deg);
    transform-origin: 0 0;
  }
}
</style>
