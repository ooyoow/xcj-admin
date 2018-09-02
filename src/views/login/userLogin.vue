<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.loginId" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
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
import { mapActions } from 'vuex'
export default {
  name: 'userLogin',
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    return {
      loginForm: {
        loginId: 'root',
        password: 'root'
      },
      checked: false,
      loginRules: {
        loginId: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, message: '密码长度最少为4位', trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  methods: {
    ...mapActions(['loginByUserName']),
    showPassword() {
      this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const callback = () => {
            this.$router.push({ name: 'map' })
          }
          this.loginByUserName({ param: this.loginForm, callback })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>
<style>
</style>
