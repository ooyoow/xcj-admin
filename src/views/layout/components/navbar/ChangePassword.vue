<template>
  <el-dialog title="修改密码" :visible="show" @close="onCancel">
    <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px">
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="pwdForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="currentPassword">
        <el-input type="password" v-model="pwdForm.currentPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="pwdForm.confirmPassword" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ChangePassword',
  props: {
    show: { type: Boolean, default: false },
    onSubmit: Function,
    onCancel: Function
  },
  data() {
    return {
      pwdForm: {
        password: '',
        currentPassword: '',
        confirmPassword: ''
      },
      rules: {
        password: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
        currentPassword: [{ required: true, validator: this.validatePass, trigger: 'change' }],
        confirmPassword: [{ required: true, validator: this.validateConfirmPass, trigger: 'change' }]
      }
    }
  },
  methods: {
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    },
    validateConfirmPass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.currentPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    handleSubmit() {
      this.$refs['pwdForm'].validate(valid => {
        if (valid) {
          const { confirmPassword, ...anyProps } = this.pwdForm
          this.onSubmit(anyProps, this.$refs['pwdForm'].resetFields)
        }
      })
    },
    handleCancel() {
      this.$refs['pwdForm'].resetFields()
      this.onCancel()
    }
  }
}
</script>
