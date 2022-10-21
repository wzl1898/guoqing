<template>
  <van-tabbar v-model="active" active-color="#b13a3d">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/personal">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "Footer",
  data (){
    return {
      active: 0
    }
  }
}
</script>
