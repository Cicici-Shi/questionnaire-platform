import request from '@/utils/request'

export const loginAPI = () => {
  return request({
    url: '/question-api/auth/login',
    method: 'post'
  })
}
