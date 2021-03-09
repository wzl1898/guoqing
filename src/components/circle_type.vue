<template>
  <div class="circle_container center">
    <div class="circle_container_circle-1 " />
    <div class="circle_container_circle-2 " />
    <div class="circle_container_circle-3 " />
    <div class="circle_container_circle-4 center">
      <div :class="['circle_container_icon', icon]" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CircleType',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.circle_container {
  position: relative;
  width: circle-width(147);
  height: circle-width(147);
  background-image: url('../assets/images/guide/circle1.png');
  background-size: 100%;

  &_circle-1 {
    position: absolute;
    width: circle-width(111);
    height: circle-width(111);
    background-image: url('../assets/images/guide/circle2.png');
    background-size: 100%;
    transition: all 2s;
    transform: rotateZ(-360deg);
  }

  &_circle-2 {
    position: absolute;
    width: circle-width(106);
    height: circle-width(115);
    background-image: url('../assets/images/guide/circle3.png');
    background-size: 100%;
    transition: all 2s;
  }

  &_circle-3 {
    position: absolute;
    width: circle-width(99);
    height: circle-width(99);
    background-image: url('../assets/images/guide/circle4.png');
    background-size: 100%;
  }

  &_circle-4 {
    position: absolute;
    width: circle-width(82);
    height: circle-width(82);
    background-image: url('../assets/images/guide/circle5.png');
    background-size: 100%;
  }

  &_icon {
    background-size: 100%;
    // 采集
    &.collection {
      width: circle-width(47);
      height: circle-width(47);
      background-image: url('../assets/images/guide/collection.png');
    }
    // 脱敏发现
    &.find {
      width: circle-width(47);
      height: circle-width(53);
      background-image: url('../assets/images/guide/find.png');
    }
    // 原始库
    &.origin {
      width: circle-width(53);
      height: circle-width(52);
      background-image: url('../assets/images/guide/origin.png');
    }
    // 质检
    &.quality {
      width: circle-width(55);
      height: circle-width(55);
      background-image: url('../assets/images/guide/quality.png');
    }
    // 数据标准
    &.standard {
      width: circle-width(60);
      height: circle-width(43);
      background-image: url('../assets/images/guide/standard.png');
    }
    // 工程管理
    &.project {
      width: circle-width(52);
      height: circle-width(46);
      background-image: url('../assets/images/guide/project.png');
    }
    // 标准库
    &.normal {
      width: circle-width(49);
      height: circle-width(56);
      background-image: url('../assets/images/guide/normal.png');
    }
    // 主题库
    &.theme {
      width: circle-width(48);
      height: circle-width(54);
      background-image: url('../assets/images/guide/theme.png');
    }
    // 模型
    &.model {
      width: circle-width(60);
      height: circle-width(50);
      background-image: url('../assets/images/guide/model.png');
    }
    // api网关
    &.api {
      width: circle-width(58);
      height: circle-width(52);
      background-image: url('../assets/images/guide/api.png');
    }
    // 脱敏方案
    &.programme {
      width: circle-width(53);
      height: circle-width(53);
      background-image: url('../assets/images/guide/programme.png');
    }
    // 脱敏规则
    &.rule {
      width: circle-width(49);
      height: circle-width(49);
      background-image: url('../assets/images/guide/rule.png');
    }
  }

  &:hover {
    .circle_container_circle-1 {
      transform: rotateZ(360deg);
    }

    .circle_container_circle-2 {
      transform: rotateZ(-450deg);
    }
  }
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
