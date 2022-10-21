<template>
 <div class="container">
  <img class="logo" src="@/assets/images/fzu-logo.png" alt="can't find img">
  <div class="loginForm">
    <van-form class="form" @submit="onSubmit">
      <van-field
        class="field"
        v-model="username"
        name="用户名"
        placeholder="请输入账号"
        :left-icon= "usernameIcon"
        :rules="[{ required: true, message: '' }]"
      />
      <van-field
        class="field"
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :left-icon= "passwordIcon"
        :rules="[{ required: true, message: '' }]"
      />
      <div class="buttonContainer">
        <van-button class="submitBtn" round size="large" type="info" native-type="submit" @click="goLogin()">提交</van-button>
      </div>
    </van-form>
    <div class="buttonContainer auth">
        <van-button class="submitBtn" round size="large" type="info" native-type="submit">统一身份认证</van-button>
      </div>
  </div>
 </div>
</template>

<script>
import {login, loginlic} from "@/api/login.js"
import {mapActions} from 'vuex';
export default {
  data () {
    return {
      username: '',
      password: '',
      usernameIcon: require('../../assets/images/username-icon.png'),
      passwordIcon: require('../../assets/images/password-icon.png'),
    }
  },
  methods: {
    ...mapActions(['setUser', 'setToken']),
    onSubmit (values) {
      console.log('submit', values)
    },
    goLogin(){
      login().then(
        (res) => {
          if (res.msgCode === 0){
            let token = res.item.token;
            let user = res.item.user;
            loginlic(token.access_token).then(
              res => {
                user = res.item.user;
                this.setUser(user);
                this.setToken(token);
                this.$router.push("/home");
              }
            )
          }
        }
      )
    },

  }
}
</script>

<style scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  padding: 31.73333vw 17.33333vw 0;
  background: url('../../assets/images/login-bg.png') no-repeat;
  background-size: cover;
}

.logo {
  width: 66.4vw;
}

.loginForm {
  margin-top: 30.33333vw;
}

.field {
  background: rgba(0, 0, 0, 0);
}

.buttonContainer {
  width: 46.66667vw;
  margin: 13.33333vw auto 0;
}

.submitBtn {
  background-color: #b13a3d;
  border: #b13a3d;
}

.auth {
  margin: 5.33333vw auto 0;
}
</style>
