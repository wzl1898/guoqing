<template>
  <div>
    <el-container>
      <!-- 引入头部slot -->
      <!-- <el-header class="eldHeader">
        <slot name="breadcrumb"></slot>
      </el-header> -->
      <!-- 引入头部slot -->
      <el-header class="marginspace">
        <slot name="header" />
      </el-header>
      <el-main>
        <!-- 引入表格slot -->
        <slot name="table" />
        <slot name="editDialog" />
      </el-main>
      <el-footer
        class="marginspace"
        style="height: 40px;"
      >
        <!-- 引入footerslot -->
        <slot name="pagination" />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@customStyle';

.marginspace {
  height: auto;
  margin: 10px 0 0;
}

.eldHeader {
  height: 40px !important;
  padding: 0;
  background: $tint-color-background-header;

  > h5 {
    margin: 0 20px;
    line-height: 40px;
  }
}
</style>
