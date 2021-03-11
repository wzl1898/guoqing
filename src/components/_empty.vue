<template>
  <div class="empty_container">
    <el-image :src="imgSrc" />
  </div>
</template>
<script>
import emptyImg from '@assets/images/empty.png'
export default {
  data () {
    return {
      imgSrc: emptyImg
    }
  }
}
</script>
<style lang="scss" scoped>
.empty_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  >>> .el-image {
    object-fit: contain;
  }
}
</style>
