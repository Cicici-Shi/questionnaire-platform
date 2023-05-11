// 二次封装axios
import axios from 'axios'
export const baseURL = '/api'
import { useLoadingStore } from '@/store'
const request = axios.create({
  baseURL,
  timeout: 10000
})
const store = useLoadingStore()
request.interceptors.request.use(
  function (config) {
    store.startLoading()
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  function (res) {
    setTimeout(() => {
      store.stopLoading()
    }, 500)
    return res.data
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default request
