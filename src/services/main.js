import request from '@/utils/request'

export const getQuestionAPI = (type, id = 1) => {
  return request({
    url: `/question-api/question-naire/${type}/${id}`,
    method: 'get'
  })
}

export const submitAPI = (type, result, id = 1) => {
  return request.post(`/question-api/question-naire/${type}/${id}`, {
    result
  })
}

