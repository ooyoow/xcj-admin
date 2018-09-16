import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getCookie } from '@/utils/cookie'
import { deleteObjectEmptyValue } from '@/utils/general'
import BASE_URL from '../../config/serve'

const $axios = axios.create({
  baseURL: BASE_URL, // api的base_url
  timeout: 30000 // 请求超时
})

// 请求拦截器
$axios.interceptors.request.use(
  config => {
    const token = getCookie('token')
    if (token) {
      // 让每个请求携带token-- ['X-Token']为自定义key
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
    const { success, message } = response.data
    if (!success) {
      Message({
        message: message || '系统繁忙',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default $axios
