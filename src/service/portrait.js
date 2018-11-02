/**
 * module: 会员画像接口服务
 * author：毛嘉维
 * date: 20181007
 */

import $axios from '@/utils/axios'

// 查询会员增长数据
export const _getUserIncreate = params => {
  return $axios({
    method: 'get',
    url: '/api/v1/user/queryUserIncrease',
    params: params
  })
}

// 导出会员增长数据
export const _exportUserIncrease = params => {
  return $axios({
    url: '/api/v1/user/exportUserIncrease',
    method: 'get',
    params: params
  })
}

// 添加门店
export const addStore = data => {
  return $axios({
    url: '/api/v1/store/addStore',
    method: 'post',
    data: data
  })
}
