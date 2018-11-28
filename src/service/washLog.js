/**
 * module: 洗车记录接口服务
 * author：毛嘉维
 * date: 20181129
 */

import $axios from '@/utils/axios'

// 获取门店列表选项
export const _getStoreOptions = () => {
  return $axios({
    url: '/api/v1/store/queryStoreAll',
    method: 'get'
  })
}

// 查询洗车记录
export const _getWashList = params => {
  return $axios({
    url: '/api/v1/payRecd/queryWashOrderBypage',
    method: 'get',
    params
  })
}
