module.exports = {
  name: '福瑞道', // 福瑞道 8085 得乐汽配、8086小巨蛋洗车 8087临安洗车
  version: '0.0.1',
  baseUrl: process.env.NODE_ENV === 'production' ? 'http://39.104.102.99:8085' : 'http://39.104.102.99:8085',
  fileBaseUrl: 'http://washcar.jidiannetwork.com/file/hainan_admin'
}