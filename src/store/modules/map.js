import $axios from '@/utils/axios'

const map = {
  state: {
    storeList: []
  },
  getters: {},
  mutations: {
    MAP_GET_STORE: (state, data) => {
      state.storeList = data
    }
  },
  actions: {
    getStore({ commit }, type) {
      $axios({
        method: 'get',
        url: `/api/v1/store/storeInfo?type=${type}`
      }).then(response => {
        const { resultObj } = response.data
        if (resultObj) {
          commit('MAP_GET_STORE', resultObj)
        }
      })
    }
  }
}

export default map
