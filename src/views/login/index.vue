<template>
  <div class="app-login-frame" @keyup.enter.native="handleLogin">
    <div class="login-container">
      <div class="app-name">无人值守洗车后台业务管理系统</div>
      <div class="login-main">
        <user-login></user-login>
        <!-- <el-tabs :stretch="true" v-model="activeName">
          <el-tab-pane label="用户密码" name="user">
            <user-login></user-login>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <mobile-login></mobile-login>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from './userLogin'
import mobileLogin from './mobileLogin'
import './login.scss'
export default {
  name: 'login',
  components: {
    userLogin,
    mobileLogin
  },
  data() {
    return {
      activeName: 'user'
    }
  }
}
</script>