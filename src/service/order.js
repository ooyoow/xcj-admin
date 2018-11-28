/**
 * module: 订单记录接口服务
 * author：毛嘉维
 * date: 20181129
 */

import $axios from '@/utils/axios'

// 查询洗车记录
export const _getOrderList = params => {
  return $axios({
    url: '/api/v1/payRecd/queryPayOrderBypage',
    method: 'get',
    params
  })
}
