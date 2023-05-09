// 二次封装axios
import axios from 'axios'

export const baseURL = '/api'
const request = axios.create({
  baseURL,
  timeout: 10000
})

request.interceptors.request.use(
  function (config) {
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  function (res) {
    return res.data
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default request
