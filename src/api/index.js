import axios from 'axios'
// 设置baseURL
const baseUrl = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseUrl

// 添加一个拦截器
// config:可以进行请求头的设置，通过headers属性
// 自动调用
axios.interceptors.request.use(function (config) {
  // Do something before request is sent:在请求之前需要做的事情就在这个位置写
  // 1.获取token
  var token = localStorage.getItem('mytoken')
  if (token) {
  // 2.写入请求头
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // Do something with request error：请求失败了的处理在这里写
  return Promise.reject(error)
})

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

// 获取usertable数据
export const getUserdata = (params) => {
  return axios.get('users', {params: params})
    .then(
      (res) => {
        console.log(res)
        return res
      }
    )
    .catch(
      (err) => {
        console.log(err)
      }
    )
}

// 添加用户信息
export const addUserdata = (params) => {
  return axios.post('users', params)
    .then((res) => {
      console.log(params)
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
}
