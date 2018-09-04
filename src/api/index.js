import axios from 'axios'
// 设置baseURL
const baseUrl = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseUrl

// 封装登录函数
export const login = (params) => {
  return axios.post('login', params)
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}
