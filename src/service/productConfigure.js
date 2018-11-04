/**
 * module: 产品配置接口服务
 * author：毛嘉维
 * date: 20181007
 */

import $axios from '@/utils/axios'

// 获取优惠券模板
export const _getCouponTemplate = () => {
  return $axios({
    url: 'api/v1/templet/queryTemplet',
    method: 'get'
  })
}

// 新增产品
export const _createProduct = params => {
  return $axios({
    url: '/api/v1/product/addProduct',
    method: 'post',
    data: params
  })
}
