import request from '@/utils/request'

export const getQuestionAPI = (type, id = 1) => {
  return request({
    url: `/api/question-naire/${type}/${id}`,
    method: 'get'
  })
}

export const submitAPI = (type, result, done, id = 1) => {
  return request.post(`/api/question-naire/${type}/${id}`, {
    result,
    done
  })
}
