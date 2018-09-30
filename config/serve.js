const env = process.env.NODE_ENV
const devServiceUrl = 'http://washcar.jidiannetwork.com/hainan_admin' // 'http://116.85.39.111' // 'http://10.107.66.190:8087'
const prodServiceUrl = 'http://washcar.jidiannetwork.com/hainan_admin' // 'http://116.85.39.111'
const BASE_URL = env === 'production' ? prodServiceUrl : devServiceUrl
export const FILE_BASE_URL = 'http://washcar.jidiannetwork.com/file/hainan_admin'

export default BASE_URL
