<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-info text-white animated fadeInLeft">
      <h2 class="login-info-title">xxxxxx</h2>
      <ul class="login-info-list">
        <li class="login-info-item" v-for="item in ['1.添加些系统介绍文字','2.轻松无忧自动化洗车']" :key="item">
          <i class="el-icon-check"></i>&nbsp;{{item}}
        </li>
      </ul>
    </div>
    <div class="login-border  animated fadeInRight">
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

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: 100%;
}
.login-container::before {
  z-index: -999;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(238, 238, 238);
  // background-image: -webkit-linear-gradient(
  //     90deg,
  //     rgba(162, 103, 84, 0) 0%,
  //     rgba(162, 103, 84, 1) 100%,
  //     rgba(162, 103, 84, 1) 100%
  //   ),
  //   -webkit-linear-gradient(0deg, rgba(24, 47, 69, 0) 0%, rgba(24, 47, 69, 1) 100%, rgba(24, 47, 69, 1) 100%),
  //   -webkit-linear-gradient(-90deg, rgba(64, 73, 90, 0) 0%, rgba(64, 73, 90, 1) 100%, rgba(64, 73, 90, 1) 100%),
  //   -webkit-linear-gradient(-180deg, rgba(252, 192, 91, 0) 0%, rgba(252, 192, 91, 1) 100%, rgba(252, 192, 91, 1) 100%);
  // background-size: cover;
}
.login-info {
  margin-top: -40%;
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 50px 25px 50px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #eee;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
  .tab-choose {
    text-align: center;
  }
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #409eff;
  letter-spacing: 3px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
}
.login-form {
  margin: 10px 0;
  .assist-options {
    &::after {
      clear: both;
    }
    .forget-pwd {
      color: #606266;
      float: right;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
</style>