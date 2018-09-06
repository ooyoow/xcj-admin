import $axios from '@/utils/axios'
import { setCookie, removeCookie } from '@/utils/cookie'
import { MessageBox } from 'element-ui'

const login = {
  state: {
    userInfo: {}
  },
  actions: {
    /**
     * 登录
     * @param {Object} param0 context
     * @param {Object} param1 { username, password }
     * @param {Function} param2
     */
    loginByUserName({ commit }, { param, callback }) {
      $axios({
        method: 'post',
        url: '/api/v1/login',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify(param)
      })
        .then(response => {
          const { resultObj } = response.data
          const { adminId, token, name } = resultObj
          setCookie('uuid', adminId)
          setCookie('token', token)
          // 设置 vuex 用户信息
          commit('appSetUserInfo', {
            name: name
          })
          // 用户登录后从数据库加载一系列的设置
          commit('appLoadLoginSuccess')
          callback(resultObj)
        })
        .catch(err => {
          console.error('err: ', err)
        })
    },

    /**
     * 注销用户并返回登录页面
     * @param {Object} param0 context
     * @param {Object} confirm need confirm ?
     */
    logout({ commit }, { confirm, callback }) {
      /**
       * @description 注销
       */
      const next = () => {
        // 删除cookie
        removeCookie('token')
        removeCookie('uuid')
        // 执行回调
        callback()
      }
      // 判断是否需要确认
      if (confirm) {
        MessageBox.confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning'
        })
          .then(() => {
            next()
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        next()
      }
    }
  }
}

export default login
