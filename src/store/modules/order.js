import $axios from '@/utils/axios'

const order = {
  state: {
    orderInfo: {},
    memberInfo: {},
  },
  getters: {},
  mutations: {
    GET_ORDER_INFO: (state, orderInfo) => {
      state.orderInfo = orderInfo
    },
    GET_MEMBER_INFO: (state, memberInfo) => {
      state.memberInfo = memberInfo
    }
  },
  actions: {

    // 查询交易数据
    getOrderInfo({ commit }) {
      $axios({
        method: 'get',
        url: '/api/v1/summary/topInfo'
      }).then(response => {
        const { data } = response
        if (data && data.resultObj) {
          commit('GET_ORDER_INFO', data.resultObj)
        }
      })
    },

    // 查询会员数据
    getMemberInfo({ commit }) {
      $axios({
        method: 'get',
        url: '/api/v1/user/countUserInfo'
      }).then(response => {
        const { data } = response
        if (data && data.resultObj) {
          commit('GET_MEMBER_INFO', data.resultObj)
        }
      })
    }
  }
}

export default order
