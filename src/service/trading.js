/**
 * module: 交易驾驶舱接口服务
 * author：毛嘉维
 * date: 20181007
 */

import $axios from '@/utils/axios'

// 获取今日、昨日、近七天交易数据
export const getNearTrading = () => {
  return $axios({
    method: 'get',
    url: '/api/v1/summary/topInfo'
  })
}

// 获取订单总览
export const getOrderView = () => {
  return $axios({
    url: '/api/v1/summary/overview',
    method: 'get'
  })
}

// 获取用户总览
export const getUserView = () => {
  return $axios({
    method: 'get',
    url: '/api/v1/user/countUserInfo'
  })
}

// 获取产品实时销量
export const getRealTimeSales = (type, start, end) => {
  return $axios({
    url: '/api/v1/summary/realtimesales',
    method: 'get',
    params: { type, start, end }
  })
}

// 获取订单统计
export const getOrderStats = (type, start, end) => {
  return $axios({
    url: '/api/v1/summary/orderstatic',
    method: 'get',
    params: {
      type: type,
      start: start,
      end: end
    }
  })
}

// 获取销售统计
export const getSalesStats = (type, start, end) => {
  return $axios({
    url: '/api/v1/summary/salestatic',
    method: 'get',
    params: {
      type: type,
      start: start,
      end: end
    }
  })
}

// 获取洗车量统计
export const getWashStats = (storeId, type, start, end) => {
  return $axios({
    url: '/api/v1/summary/washstatic',
    method: 'get',
    params: {
      storeId: storeId,
      type: type,
      start: start,
      end: end
    }
  })
}

// 获取服务额统计
export const getServiceStats = (storeId, type, start, end) => {
  return $axios({
    url: '/api/v1/summary/servicestatic',
    method: 'get',
    params: {
      storeId: storeId,
      type: type,
      start: start,
      end: end
    }
  })
}

// 获取分润统计
export const getProfitStats = (storeId, type, start, end) => {
  return $axios({
    url: '/api/v1/summary/profitstatic',
    method: 'get',
    params: {
      storeId: storeId,
      type: type,
      start: start,
      end: end
    }
  })
}

// 获取订单详情
export const getOrderDetail = orderStatus => {
  return $axios({
    url: '/api/v1/summary/orderDetail',
    method: 'get',
    params: { orderStatus }
  })
}

// 获取门店下拉选项
export const getStoreOptions = organizationId => {
  return $axios({
    url: '/api/v1/store/queryStoreInfoList',
    method: 'get',
    params: { organizationId }
  })
}
