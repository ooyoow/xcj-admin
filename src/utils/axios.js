import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getCookie } from '@/utils/cookie'
import { deleteObjectEmptyValue } from '@/utils/general'
import BASE_URL from '../../config/serve'

const $axios = axios.create({
  baseURL: BASE_URL, // api的base_url
  timeout: 30000 // 请求超时
})

// 让每个请求携带token
// $axios.defaults.headers.common['Authorization'] = token || ''
// 请求拦截器
$axios.interceptors.request.use(
  config => {
    const token = getCookie('token')
    if (token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = token
    }
    if (config.method.toLocaleLowerCase() === 'get' && config.params) {
      config.params = deleteObjectEmptyValue(config.params)
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
$axios.interceptors.response.use(
  response => {
    if (response) {
      const { success, message } = response.data
      if (!success) {
        Message({
          message: message || '系统繁忙',
          type: 'error',
          duration: 5 * 1000
        })
        return new Promise(() => { })
      }
    }
    return response.data
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('fedLogOut')
          location.reload() // 刷新回到登录页面
          break
        default:
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
          break
      }
      return Promise.reject(error)
    }
  }
)

export default $axios
