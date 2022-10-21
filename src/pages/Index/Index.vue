<template>
  <div class="index">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue"
export default {
  name: "Index",
  components: {Footer}
}
</script>
