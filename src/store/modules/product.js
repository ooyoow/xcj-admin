import $axios from '@/utils/axios'

const product = {
  actions: {
    /**
     * @description // 查询产品 （套餐、限次卡、优惠券）
     * @param {Object} params
     * @param {Function} callback
     */
    getProduct({}, { params, callback }) {
      $axios({
        method: 'get',
        url: '/api/v1/product/queryProductList',
        params: params
      }).then(response => {
        const { resultObj } = response.data
        callback(resultObj || [])
      })
    },
    /**
     * @description // 统计产品数
     * @param {Object} params
     * @param {Function} callback
     */
    getProductStatsByType({}, { params, callback }) {
      $axios({
        method: 'get',
        url: '/api/v1/product/queryProductStatictis',
        params: params
      }).then(response => {
        const { resultObj } = response.data
        callback(resultObj || {})
      })
    },
    deleteProduct({}, { params, callback }) {
      $axios({
        url: '/api/v1/product/deleteProduct',
        method: 'post',
        data: params
      }).then(callback)
    }
  }
}

export default product
