const env = process.env.NODE_ENV
const devServiceUrl = 'http://39.104.102.99:8087' // 'http://116.85.52.13:8080' // 'http://10.107.66.190:8087'
const prodServiceUrl = 'http://39.104.102.99:8087' // 'http://116.85.52.13:8080' // 'http://washcar.jidiannetwork.com/hainan_admin'
const BASE_URL = env === 'production' ? prodServiceUrl : devServiceUrl
export const FILE_BASE_URL = 'http://washcar.jidiannetwork.com/file/hainan_admin'

export default BASE_URL
