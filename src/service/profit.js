/**
 * module: 利润统计接口服务
 * author：毛嘉维
 * date: 20181007
 */

import $axios from '@/utils/axios'

// 获取当前登录用户门店列表
export const _getStoreListByLoginUser = () => {
  return $axios({
    url: '/api/v1/store/queryStoreByUser',
    method: 'get'
  })
}

// 获取门店每日利润统计
export const _getProfitStatsList = params => {
  return $axios({
    method: 'get',
    url: '/api/v1/statistics/queryServerStaticsList',
    params: params
  })
}
