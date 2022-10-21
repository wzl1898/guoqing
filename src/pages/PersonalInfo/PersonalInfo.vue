<template>
<div class="Container">
  <van-nav-bar
    left-text="返回"
    @click-left="$router.go(-1)"
    left-arrow
    title="个人信息"
  />
  <div class="infoContainer">
    <div class="basic">
      <p class="infoTitle"> 基础信息 </p>
      <van-cell class="cell" title="姓名" label=" 庄晨忠 " />
      <van-cell class="cell" title="性别" label=" 男 " />
      <van-cell class="cell" title="出生日期" label=" 1969-06-26 " />
      <van-cell class="cell" title="国籍" label=" 中国 " />
      <van-cell class="cell" title="联系电话" label=" 18033999518 " />

    </div>
    <div class="basic">
      <p class="infoTitle"> 常用信息 </p>
      <van-cell class="cell" title="籍贯" label=" 福清市 " />
      <van-cell class="cell" title="民族" label=" 汉 " />
      <van-cell class="cell" title="政治面貌" label=" 中国共产党党员 " />
      <van-cell class="cell" title="身份证号" label="  350102196906260411  " />
      <van-cell class="cell" title="文化程度" label=" 300 " />
      <van-cell class="cell" title="工作部门" label="  福州大学纪委（监察专员办公室）综合室、纪检监察室  " />
      <van-cell class="cell" title="职务" label="  研究员(教育管理)  " />
      <van-cell class="cell" title="家庭住址" label=" 暂无 " />
      <van-cell class="cell" title="应急联系人" label=" - " />
      <van-cell class="cell" title="联系电话" label=" - " />
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.Container {
  height: 100%;
}

/deep/ .van-ellipsis {
  color: #fff;
}

/deep/ .van-nav-bar__text {
  color: #fff;
}

/deep/ .van-nav-bar__arrow {
  color: #fff;
}

/deep/ .van-nav-bar__content {
  background: #b13a3d;
}

.infoContainer {
  padding: 8.53333vw 6.66667vw 6.66667vw;
}

.basic {
  margin-bottom: 8.53333vw;
}

.infoTitle {
  font-size: 5.86667vw;
  color: #282828;
}

.cell {
  padding: 0;
  margin: 5.86667vw 0;
}

/deep/ .van-cell__title {
  font-size: 3.46667vw;
  color: #282828;
}

/deep/ .van-cell__label {
  padding: 3.2vw 0;
  margin: 0;
  font-size: 4vw;
  line-height: 0;
  color: #868686;
}
</style>
