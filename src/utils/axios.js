import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getCookie } from '@/utils/cookie'
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
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = token
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
