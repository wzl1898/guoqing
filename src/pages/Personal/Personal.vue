<template>
  <div class="Container">
    <van-nav-bar
      title="我的"
    />
    <div class="personalContainer">
      <div class="infoContainer">
        <div class="infoUser">
          <van-image class="avatar" :src="avatar" round></van-image>
          <p class="username">{{user.xm}}</p>
          <van-badge :content="0">
            <van-icon class="envelopIcon" name="envelop-o" @click="$router.push('/user-message')"></van-icon>
          </van-badge>
        </div>
        <div class="infoBanner">
          <van-image class="banner" :src="banner"></van-image>
        </div>
      </div>
      <div class="menuContainer">
        <van-cell-group>
          <van-cell title="我的消息" :icon="icon1" is-link @click="$router.push('/user-message')"/>
          <van-cell title="个人信息" :icon="icon2" is-link @click="$router.push('/personal-information')"/>
          <van-cell title="我的申请" :icon="icon3" is-link @click="$router.push('/user-application')"/>
          <van-cell title="我的审批" :icon="icon4" is-link @click="$router.push('/user-approve')"/>
        </van-cell-group>
      </div>
      <div class="logout">退出登录</div>
    </div>
  </div>

</template>

<script>
import Footer from "../../components/Footer.vue"
import {mapState} from 'vuex';
export default {
  name: "Personal",
  components: {Footer},
  data (){
    return {
      icon1: require('../../assets/images/personal-icon1.png'),
      icon2: require('../../assets/images/personal-icon2.png'),
      icon3: require('../../assets/images/personal-icon3.png'),
      icon4: require('../../assets/images/personal-icon4.png'),
      avatar: require('../../assets/images/personal-avatar.jpg'),
      banner: require('../../assets/images/personal-banner.png'),
    }
  },
  computed: {
    ...mapState(['user']),
  }
}
</script>

<style scoped>
.Container {
  height: 100%;
  background-color: #f1f3f5;
}

.personalContainer {
  height: calc(var(--vh, 1vh) * 100 - 13.33333vw);
}

/deep/ .van-ellipsis {
  color: #fff;
}

/deep/ .van-nav-bar__content {
  background: #b13a3d;
}

.infoUser {
  display: flex;
  align-items: center;
  padding: 4vw 4vw 16vw;
  background-color: #fff;
}

.infoBanner {
  height: 26.66667vw;
  margin: -13.33333vw 4vw 0;
  overflow: hidden;
  border-radius: 4vw;
}

.banner {
  width: 100%;
  height: 100%;
}

.avatar {
  width: 10.66667vw;
  height: 10.66667vw;
}

.username {
  flex: 1;
  padding: 0 2.66667vw;
  font-size: 4vw;
}

.envelopIcon {
  font-size: 5.33333vw;
}

.menuContainer {
  margin-top: 5.33333vw;
}

.logout {
  padding: 4vw 0;
  margin-top: 5.33333vw;
  font-size: 3.46667vw;
  color: #b13a3d;
  text-align: center;
  background-color: #fff;
}
</style>
