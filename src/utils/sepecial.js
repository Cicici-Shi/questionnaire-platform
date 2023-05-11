export const specicalQuestionList = ['4', '5', '6', '7', '8', '9']
export const isChat2 = () => {
  const url = window.location.href
  console.log(url)
  return url.indexOf('chat2') > -1 ? true : false
}
