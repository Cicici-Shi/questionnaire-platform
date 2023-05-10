import request from '@/utils/request'

export const loginAPI = () => {
  return request({
    url: '/api/auth/login',
    method: 'post'
  })
}
