import $axios from '@/utils/axios'
import { setCookie, removeCookie } from '@/utils/cookie'

const login = {
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 账户名登录
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
          const { adminId, token } = resultObj
          setCookie('userId', adminId)
          setCookie('token', token)
          // 设置用户信息
          commit('SET_USER_INFO', resultObj)
          console.log(resultObj, 'resultObj')
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
    logout({ commit }, callback) {
      /**
       * @description 注销
       */
      $axios({
        method: 'post',
        url: '/api/v1/logout'
      })
        .then(response => {
          const { success } = response.data
          if (success) {
            removeCookie('userId')
            removeCookie('token')
            commit('SET_USER_INFO', {})
            callback()
          }
        })
        .catch(err => {
          console.error('err: ', err)
        })
    }
  }
}

export default login
