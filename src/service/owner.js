/**
 * module: 所有者接口服务
 * author：毛嘉维
 * date: 20181007
 */

import $axios from '@/utils/axios'

// 获取所有者列表
export const getOwnerList = (ownerName, currentPage, size) => {
  return $axios({
    url: '/api/v1/organization/queryOrganization',
    method: 'get',
    params: { ownerName, currentPage, size }
  })
}

// 添加所有者
export const addOwner = data => {
  return $axios({
    url: '/api/v1/organization/addOrg',
    method: 'post',
    data: data
  })
}

// 编辑所有者
export const editOwner = data => {
  return $axios({
    url: '/api/v1/organization/editOrg',
    method: 'post',
    data: data
  })
}

// 删除所有者
export const deleteOwner = organizationId => {
  return $axios({
    url: '/api/v1/organization/deletOrg',
    method: 'post',
    params: { organizationId }
  })
}
