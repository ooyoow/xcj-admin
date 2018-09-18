<template>
  <div class="app-login-frame" @keyup.enter.native="handleLogin">
    <!-- <div class="login-info text-white animated fadeInLeft">
      <h2 class="login-info-title">xxxxxx</h2>
      <ul class="login-info-list">
        <li class="login-info-item" v-for="item in ['1.添加些系统介绍文字','2.轻松无忧自动化洗车']" :key="item">
          <i class="el-icon-check"></i>&nbsp;{{item}}
        </li>
      </ul>
    </div> -->
    <div class="login-container">
      <div class="app-name">无人值守洗车后台业务管理系统</div>
      <div class="login-main">
        <el-tabs :stretch="true" v-model="activeName">
          <el-tab-pane label="用户密码" name="user">
            <user-login></user-login>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <mobile-login></mobile-login>
          </el-tab-pane>
        </el-tabs>
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