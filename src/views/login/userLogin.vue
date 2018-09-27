<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="loginId">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.loginId" auto-complete="off" placeholder="请输入用户名">
        <i class="el-icon-user" slot="prefix" />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i class="el-icon-password" slot="prefix" />
      </el-input>
    </el-form-item>
    <div class="assist-options">
      <el-checkbox v-model="checked">记住账号</el-checkbox>
      <label class="forget-pwd">忘记密码？</label>
    </div>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";
import { getAllCookie, setCookie, removeCookie } from "@/utils/cookie";
export default {
  name: "userLogin",
  data() {
    return {
      loginForm: {
        loginId: "",
        password: ""
      },
      checked: false,
      loginRules: {
        loginId: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
          // { min: 6, message: '密码长度最少为6位', trigger: 'change' }
        ]
      },
      passwordType: "password"
    };
  },
  created() {
    const allCookie = getAllCookie();
    const { loginInfo } = allCookie;
    if (loginInfo) {
      try {
        const data = JSON.parse(loginInfo);
        const { loginId, password, checked } = data;
        this.loginForm = {
          loginId: loginId || "",
          password: password || ""
        };
        this.checked = true;
      } catch (error) {
        console.error(error);
      }
    }
  },
  methods: {
    ...mapActions(["loginByUserName"]),
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const callback = result => {
            this.$router.push({ path: "map" });
            localStorage.setItem("userInfo", JSON.stringify(result)); // 保存用户信息
          };
          if (this.checked) {
            const loginInfo = {
              ...this.loginForm,
              checked: this.checked
            };
            setCookie("loginInfo", JSON.stringify(loginInfo)); // 记录登录信息
          } else {
            removeCookie("loginInfo");
          }
          this.loginByUserName({ params: this.loginForm, callback });
        }
      });
    }
  }
};
</script>
