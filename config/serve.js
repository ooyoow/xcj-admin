const env = process.env.NODE_ENV
const devServiceUrl = 'http://116.85.23.63:8080' // 'http://10.107.66.190:8087'
const prodServiceUrl = 'http://116.85.23.63:8080' // 'http://washcar.jidiannetwork.com/hainan_admin'
const BASE_URL = env !== 'production' ? prodServiceUrl : devServiceUrl

export default BASE_URL
