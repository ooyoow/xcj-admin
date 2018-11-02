/**
 * module: 每日统计接口服务
 * author：毛嘉维
 * date: 20181007
 */

import $axios from '@/utils/axios'

// 获取销售额每日统计
export const _getDailySales = params => {
  return $axios({
    method: 'get',
    url: '/api/v1/statistics/queryOrderStaticsList',
    params: params
  })
}

// 每日核销
export const _dailyWriteOff = id => {
  return $axios({
    url: '/api/v1/statistics/checkOrder',
    method: 'post',
    data: { id }
  })
}
