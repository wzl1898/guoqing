<script>
// import Layout from '@layouts/loginLayout'
import { authMethods, stateRoutingMethods } from '@store/helpers'
import appConfig from '@src/app.config'
// eslint-disable-next-line
import store from '@store'
import loaderRouting from '@pages/loaderRouting'

export default {
  page: {
    title: '登录',
    meta: [{ name: 'description', content: `登录到 ${appConfig.title}` }]
  },
  // components: { Layout },
  data () {
    return {
      resForm: {
        username: '',
        password: ''
      },
      id: '',
      authError: null,
      tryingToLogIn: false
    }
  },
  computed: {
    buildTime () {
      return '构建时间: ' + process.env.VUE_APP_BUILD_TIME
    },
    placeholders () {
      return process.env.NODE_ENV === 'production'
        ? {
          username: '请输入你的账号',
          password: '请输入你的密码'
        }
        : {
          username: '使用 edp 登录, 回车继续输入密码',
          password: '请输入你的密码, 回车确定登录'
        }
    }
  },
  methods: {
    ...authMethods,
    ...stateRoutingMethods,
    // Try to log the user in with the username
    // and password they provided.
    async login () {
      try {
        await this.logIn({
          username: this.resForm.username,
          password: this.resForm.password
        })
        this.$store.dispatch('stateRouting/SetRouting').then(() => {
          // 登录成功添加路由
          loaderRouting()
          // TODO: FALITURE CASE
          this.$router.push('/enterprise-information-management/basic-information/')
          // this.$router.push(this.$route.query.redirectFrom || { path: '/chart_editor/index/' })
        })
      } catch (error) {
        // console.log(error)
      }
    }
  }
}
</script>

<template>
  <!-- <Layout> -->
  <el-container
    class="elContainerStyle"
    :model="resForm"
    direction="vertical"
  >
    <section class="login-box">
      <el-form
        class="elFormStyle"
        autocomplete="new-off"
      >
        <el-row>
          <div class="login_title_h">
            <img
              class="logo_img"
              src="@assets/images/logo.png"
              alt="logo"
            >
            <span class="text">内陆水域濒危物种救护与珍稀物种繁育智能化平台</span>
          </div>
        </el-row>
        <el-form-item>
          <el-input
            v-model="resForm.username"
            autocomplete="user-off"
            class="login_input"
            name="username"
            :placeholder="placeholders.username"
            @keyup.enter.native="
              () => {
                $refs.password.focus()
              }
            "
          >
            <img
              slot="prefix"
              class="prefix"
              src="@assets/images/login-user.png"
            >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            ref="password"
            v-model="resForm.password"
            autocomplete="pwd-off"
            class="login_input"
            name="password"
            type="password"
            show-password
            :placeholder="placeholders.password"
            @keyup.enter.native="login"
          >
            <img
              slot="prefix"
              class="prefix"
              src="@assets/images/login-password.png"
            >
          </el-input>
        </el-form-item>

        <el-form-item>
          <!-- <el-button
            type="primary"
            class="elBtnStyhle"
            :disabled="tryingToLogIn"
            @click="tryToLogIn"
          >
            <BaseIcon v-if="tryingToLogIn" name="sync" spin />
            <span v-else>
              登录
            </span>
          </el-button> -->
          <el-button
            type="primary"
            class="elBtnStyhle"
            @click="login"
          >
            登录
          </el-button>
        </el-form-item>
        <!-- <p v-if="authError">
          There was an error logging in to your account.
        </p> -->
      </el-form>
    </section>
    <footer class="footer">
      福州市联创智云信息科技有限公司 保留所有权
      <br>
    </footer>
  </el-container>
  <!-- </Layout> -->
</template>

<style lang="scss" scoped>
@import '@customStyle';

.elContainerStyle {
  height: 100vh;
  // padding: 10%;
  text-align: center;
  background: url('~@assets/images/login-bg.png') no-repeat center center fixed;
  background-size: cover;
  // background: $dark-color-background;
}

.login-box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // margin-top: 5%;
  background:
    url('~@assets/images/login-input.png') no-repeat center center
    fixed;
  // height: 577px;
  background-size: 700px;
}

.logoStyle {
  width: 100px;
  height: 100px;
}

.login_title_h {
  // position: absolute;
  margin-top: -240px;
  // margin: 0 auto;
  // margin-top: 5%;
  // font-size: 26px;
  font-weight: 400;
  color: $tint-color;
  text-align: center;

  .logo_img {
    width: 60px;
    margin-right: 10px;
    vertical-align: top;
    filter: brightness(0) invert(1);
  }

  .text {
    font-size: 30px;
    line-height: 60px;
  }
}

.elFormStyle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  margin-left: 10px;
  transform: translate(-50%, -50%);
  // margin-top: 10vh;
  .login_input {
    width: 420px;
    height: 55px;

    >>> .el-input__prefix {
      margin: 0 10px;

      .prefix {
        vertical-align: bottom;
      }
    }

    >>> .el-input__inner {
      height: 55px;
      padding-left: 50px;
      line-height: 55px;
      color: white;
      background-color: rgba(3, 81, 145, 0.5) !important;
      // color: $tint-color;
      border-color: rgb(57, 163, 255);
      // background-color: $dark-color-background-input;
      // border-color: $dark-color-border-color;
    }

    >>> input:-webkit-autofill {
      box-shadow: 0 0 0 1000px $dark-color-background-input inset !important;
      -webkit-text-fill-color: $tint-color;
    }

    // TODO: chrome浏览器表单自动填充默认样式 未解决
    >>> .el-input__inner:-webkit-autofill {
      // background-color: rgba(3, 81, 145, 0.5) !important;
      // color: $tint-color !important;
      box-shadow: 0 0 0 1000px rgb(4, 97, 172) inset !important;
    }
  }

  .elBtnStyhle {
    width: 420px;
    height: 60px;
    margin-top: 20px;
    font-size: 20px;
  }
}

.footer {
  margin-bottom: 100px;
  color: white;
}
</style>
