import request from '@/utils/request'

export const loginAPI = () => {
  return request({
    url: '/auth/login',
    method: 'post'
  })
}
