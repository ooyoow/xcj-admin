module.exports = {
  name: '鑫磊管理系统', // 鑫磊管理系统 福瑞道 8085 得乐汽配、8086 小巨蛋洗车 8087 临安洗车
  version: '0.0.1',
  // baseUrl: process.env.NODE_ENV === 'production' ? 'http://10.107.66.190:8087' : 'http://10.107.66.190:8087', // 'http://39.104.102.99:8085' : 'http://39.104.102.99:8085',
  //baseUrl: process.env.NODE_ENV === 'production' ? 'http://washcar.jidiannetwork.com/web/hainanAdmin' : 'http://washcar.jidiannetwork.com/web/hainanAdmin',
  baseUrl: process.env.NODE_ENV === 'production' ? 'http://39.104.102.99:8079' : 'http://washcar.jidiannetwork.com/hainan_admin',
  fileBaseUrl: 'http://washcar.jidiannetwork.com/file/hainan_admin'
}
