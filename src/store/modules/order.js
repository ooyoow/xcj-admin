import $axios from '@/utils/axios'

const order = {
  state: {
    orderInfo: {},
    memberInfo: {},
    orgOptions: [] // 所有者
  },
  getters: {},
  mutations: {
    GET_ORDER_INFO: (state, orderInfo) => {
      state.orderInfo = orderInfo
    },
    GET_MEMBER_INFO: (state, memberInfo) => {
      state.memberInfo = memberInfo
    },
    GET_ORG_OPTIONS: (state, orgOptions) => {
      state.orgOptions = orgOptions
    }
  },
  actions: {
    // 查询所有者下拉选项
    getOrgOptions({ commit }) {
      $axios({
        method: 'get',
        url: '/api/v1/store/queryOrgList'
      }).then(response => {
        const { resultObj } = response.data
        if (resultObj && Array.isArray(resultObj)) {
          const orgOptions = resultObj.map(item => {
            const { organizationId, ownerName, ...anyprops } = item
            return {
              label: ownerName,
              value: organizationId,
              ...anyprops
            }
          })
          commit('GET_ORG_OPTIONS', orgOptions)
        }
      })
    },

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
