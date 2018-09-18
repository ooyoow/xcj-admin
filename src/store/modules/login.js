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
     * @param {Object} param1 { loginId, password }
     * @param {Function} param2
     */
    loginByUserName({ commit }, { params, callback }) {
      $axios({
        method: 'post',
        url: '/api/v1/login',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        data: JSON.stringify(params)
      })
        .then(response => {
          const { resultObj } = response.data
          const { adminId, token } = resultObj
          setCookie('userId', adminId)
          setCookie('token', token)
          // 设置用户信息
          commit('SET_USER_INFO', resultObj)
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
    },
    /**
     * 前端 登出
     * @param {Object} param0 context
     * @param {Object} confirm need confirm ?
     */
    fedLogOut({ commit }) {
      removeCookie('userId')
      removeCookie('token')
      commit('SET_USER_INFO', {})
    }
  }
}

export default login
