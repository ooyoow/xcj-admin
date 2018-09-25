/**
 * @description 公共请求
 */
import $axios from '@/utils/axios'

const common = {
  state: {
    orgOptions: [] // 所有者
  },
  getters: {},
  mutations: {
    GET_ORG_OPTIONS: (state, orgOptions) => {
      state.orgOptions = orgOptions
    }
  },
  actions: {
    /**
     * @description 查询所有者下拉选项
     */
    getOrgOptions({ commit }, callback = () => {}) {
      $axios({
        method: 'get',
        url: '/api/v1/store/queryOrgList'
      }).then(response => {
        const { resultObj } = response
        let orgOptions = []
        if (resultObj && Array.isArray(resultObj)) {
          orgOptions = resultObj
        }
        commit('GET_ORG_OPTIONS', orgOptions)
        callback(orgOptions)
      })
    }
  }
}

export default common
