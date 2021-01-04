<template>
  <div>
    <div class="cus-form-title-before">
      <img
        src="@assets/images/box.png"
        class="box-img"
      >
    </div>
    <div class="cus-form-title">
      <span>{{ title }}</span>
    </div>
    <div style="clear: both;" />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.cus-form-title-before {
  position: relative;
  float: left;
  width: 35px;
  height: 0;
  margin-right: -6px;
  border-top: 40px #409eff solid;
  border-right: transparent 20px solid;
  border-bottom: none;
  border-left: none;

  .box-img {
    position: absolute;
    top: -34px;
    left: 7px;
    width: 30px;
    height: 30px;
  }
}

.cus-form-title {
  position: relative;
  float: left;
  width: 110px;
  height: 40px;
  margin-right: 1px;

  span {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 110px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    content: '';
    background-color: #409eff;
    -moz-transform: skewX(-26deg);
    -webkit-transform: skewX(-26deg);
    -o-transform: skewX(-26deg);
    -ms-transform: skewX(-26deg);
    transform: skewX(-26deg);
  }
}
</style>
