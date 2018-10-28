/**
 * module: 门店信息接口服务
 * author：毛嘉维
 * date: 20181007
 */

import $axios from '@/utils/axios'

// 获取门店列表
export const getStoreList = params => {
  return $axios({
    url: '/api/v1/store/queryStoreList',
    method: 'get',
    params: params
  })
}

//  查询未绑定的终端
export const getTerminalUnbound = () => {
  return $axios({
    url: '/api/v1/driver/queryDriverUnbound',
    method: 'get'
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

// 编辑门店
export const editStore = data => {
  return $axios({
    url: '/api/v1/store/editStore',
    method: 'post',
    data: data
  })
}

// 删除门店
export const deleteStore = storeId => {
  return $axios({
    url: '/api/v1/store/deleteStore',
    method: 'post',
    data: { storeId }
  })
}

// 查询门店关联所有者分润信息
export const getOwnerProfitByStoreId = storeId => {
  return $axios({
    url: '/api/v1/store/queryOwnerByStoreId',
    method: 'get',
    params: { storeId }
  })
}

// 设置所有者门店分润比例
export const setOwnerProfitByStoreId = data => {
  return $axios({
    url: '/api/v1/store/setRate',
    method: 'post',
    data: data
  })
}
