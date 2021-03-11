<template>
  <div class="item_container">
    <div class="item_container_line" />
    <p class="item_container_label">
      {{ label }}
    </p>
    <p class="item_container_value">
      {{ value }}
    </p>
    <i class="el-icon-picture item_container_icon" />
  </div>
</template>

<script>
export default {
  name: 'IntroductionItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.item_container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 14px 0;
  cursor: pointer;
  border-bottom: 2px solid #f4f4f4;

  &:hover &_icon {
    display: block;
  }

  &_line {
    width: 5px;
    height: 21px;
    margin-right: 10px;
    background-color: #5e72e4;
  }

  &_label {
    font-size: 12px;
    color: $eli-text-color;
  }

  &_value {
    flex: 1;
    font-size: 14px;
    color: $eli-text-color;
    text-align: right;
  }

  &_icon {
    display: none;
    margin-left: 10px;
    color: $tint-color-header;
  }
}
</style>
