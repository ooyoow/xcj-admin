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
        const { resultObj, totalSize } = response.data
        callback({
          list: resultObj || [],
          total: totalSize
        })
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
    /**
     * @description // 新增产品
     * @param {Object} params 产品参数
     * @param {Function} callback
     */
    createProduct({}, { params, callback }) {
      $axios({
        url: '/api/v1/product/addProduct',
        method: 'post',
        data: params
      }).then(callback)
    },
    /**
     * @description // 新增产品
     * @param {Object} params 产品参数
     * @param {Function} callback
     */
    updateProduct({}, { params, callback }) {
      $axios({
        url: '/api/v1/product/editProduct',
        method: 'post',
        data: params
      }).then(callback)
    },
    /**
     * @description // 删除产品
     * @param {Number} id 产品id
     * @param {Function} callback
     */
    deleteProduct({}, { id, callback }) {
      $axios({
        url: '/api/v1/product/deleteProduct',
        method: 'post',
        params: { id }
      }).then(callback)
    }
  }
}

export default product
