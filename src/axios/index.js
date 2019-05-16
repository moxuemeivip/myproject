import axios from 'axios'

// axios 配置
axios.defaults.timeout = 3000 // 设置超时时间为3s
// 配置axios发送请求时携带cookie
axios.defaults.withCredentials = true
// 如果为开发环境，将baseURL设置为服务器地址
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://laptop-0t8rfvad:8011'
}

export default axios