<template>
  <div id="chatContainer" :key="url">
    <section class="top name">HMS Investments</section>
    <div
      class="chat"
      :class="{ disable: disable }"
      v-for="item in currentChat"
      :key="item.content"
    >
      <ChatBox
        :type="item.type"
        :content="item.content"
        :advise="item.advise"
        :img="item.img"
        :explain="item.explain"
        :id="item.id"
        :done="done"
        :result="item.result"
        @newBtnClick="handleNewData"
        @resultChange="handleResult"
      ></ChatBox>
    </div>
    <footer class="footer-button">
      <van-button
        type="primary"
        :to="'/' + route.params.id + '/consultant'"
        @click="saveData"
        >上一页</van-button
      >
      <van-button v-if="disable" type="primary" @click="submit"
        >下一页</van-button
      >
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeMount, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getQuestionAPI, submitAPI } from '@/services/main'
import { scrollToBottom } from '@/utils/scroll'
import { useLoadingStore } from '@/store'
import { specicalQuestionList, isChat2 } from '@/utils'

const chatConfig = []
let current = ref(0)
let currentChat = ref([])
const disable = ref(false)
const store = useLoadingStore()
const url = ref(location.href)
let done = ref(false)
let currentResultId = 0
let currentId = isChat2() ? 'question2Id' : 'questionId'
const hasResultDetail = ref(false)
const firstCharList = ref([])
onBeforeMount(() => {
  store.startLoading()
  getQuestionAPI(isChat2() ? 'question2' : 'question', route.params.id).then(
    (res) => {
      const questionList = (isChat2() ? res[1].question2 : res[1].question).map(
        (item) => {
          let data = {
            id: item.id,
            chat: [
              {
                type: 'consultant',
                content: item.content,
                img: item.img
              },
              {
                type: item.answerType,
                content: item.anwerContent,
                id: item.id,
                advise: item.advise
              }
            ]
          }
          if (item.explain) {
            data.chat[0].explain = item.explain
          }
          if (item.anwerContent) {
            data.chat[1].content = JSON.parse(item.anwerContent).map((str) =>
              str.trim()
            )
          }
          if (item.advise) {
            data.chat[1].type = 'consultant'
          }
          return data
        }
      )
      for (let i = 0; i < questionList.length; i++) {
        if (
          questionList[i].chat[questionList[i].chat.length - 1].type === null
        ) {
          let formatChat = questionList[i].chat.slice(
            0,
            questionList[i].chat.length - 1
          )
          if (i + 1 >= questionList.length) {
            questionList[i].chat.pop()
            break
          }
          questionList[i + 1].chat.unshift(...formatChat)
          questionList.splice(i, 1)
          i--
        }
      }
      if (res[1].questionResult.length) {
        res[1].questionResult[0].resultDetail.forEach((result) => {
          currentResultId = Math.max(result[currentId], currentResultId)
          const question = questionList.find((q) => q.id === result[currentId])
          if (question) {
            question.chat[question.chat.length - 1].result = result.answer
          }
        })
      }
      if (res[1].questionResult[0]) {
        done.value = res[1].questionResult[0].done
      }
      if (res[1].questionResult[0]?.done) {
        disable.value = true
        questionList.forEach(function (obj) {
          currentChat.value.push(...obj.chat)
        })
      } else {
        if (res[1].questionResult[0]?.resultDetail.length == 19) {
          disable.value = true
        }
        hasResultDetail.value =
          res[1].questionResult[0]?.resultDetail.length > 0
        if (res[1].questionResult[0]?.resultDetail.length) {
          const maxItem = res[1].questionResult[0].resultDetail.reduce(
            (prev, curr) => {
              return prev[currentId] > curr[currentId] ? prev : curr
            }
          )
          for (let i = 0; i < questionList.length; i++) {
            if (questionList[i].id <= maxItem[currentId] + 1) {
              currentChat.value.push(...questionList[i].chat)
              current.value = i
            }
          }
        } else {
          firstCharList.value = questionList[0].chat
          // currentChat.value.push(...questionList[0].chat)
          // console.log('questionList : ', questionList)
        }
        chatConfig.push(...questionList)
        recoverData(res[1].questionResult)
      }
    }
  )
})

onMounted(() => {
  store.stopLoading()
  if (!done.value) {
    setTimeout(function () {
      scrollToBottom()
    }, 500)
  }
  if (!hasResultDetail.value) {
    let i = 0
    let intervalId = setInterval(() => {
      if (i >= firstCharList.value.length) {
        clearInterval(intervalId)
        return
      }
      currentChat.value.push(firstCharList.value[i])
      console.log(currentChat.value)
      i++
      nextTick(() => {
        scrollToBottom()
      })
    }, 1500)
  }
})

let handleNewData = () => {
  current.value++
  currentChat.value.push(chatConfig[current.value].chat[0])
  nextTick(() => {
    scrollToBottom()
  })
  let i = 1
  let intervalId = setInterval(() => {
    if (i >= chatConfig[current.value].chat.length) {
      clearInterval(intervalId)
      return
    }
    currentChat.value.push(chatConfig[current.value].chat[i])
    i++
    nextTick(() => {
      scrollToBottom()
    })
  }, 1000)
  if (current.value === chatConfig.length - 1) {
    setTimeout(() => {
      disable.value = true
      return
    }, 200)
  }
}

let result = ref([])
let handleResult = (resultItem) => {
  const index = result.value.findIndex(
    (item) => item[currentId] === resultItem[currentId]
  )
  if (index !== -1) {
    result.value[index] = resultItem
  } else if (resultItem.answer) {
    result.value.push(resultItem)
  }
}

const router = useRouter()
const route = useRoute()
const questionNaireId = route.params.id

const saveData = async () => {
  store.startLoading()
  if (done.value) {
    await router.push('/' + questionNaireId + '/consultant')
    store.startLoading()
  } else {
    submitAPI('question', result.value, false, questionNaireId).then(
      async () => {
        await router.push('/' + questionNaireId + '/consultant')
        store.startLoading()
      },
      () => {
        store.stopLoading()
      }
    )
  }
}

const submit = () => {
  if (done.value) {
    navToNextPage()
  } else {
    store.startLoading()
    submitAPI('question', result.value, true, questionNaireId).then(
      async () => {
        await navToNextPage()
      },
      () => {
        store.stopLoading()
      }
    )
  }
}
const navToNextPage = async () => {
  if (specicalQuestionList.includes(questionNaireId) && !isChat2()) {
    await router.push('/' + questionNaireId + '/chat2')
    store.startLoading()
  } else {
    router.push(`/${route.params.id}/accuracy`)
  }
}

const recoverData = (resultlist) => {
  if (resultlist.length) {
    const answerObjList = resultlist[0].resultDetail
    const questionAnswerMap = new Map()
    answerObjList.forEach((ansObj) => {
      questionAnswerMap.set(ansObj.questionId, ansObj.answer)
    })

    const tempvalue = []
    chatConfig.forEach((config, index) => {
      const questionId = config.id
      if (questionAnswerMap.has(questionId)) {
        if (config.type == 'rate') {
          tempvalue[index] = parseInt(questionAnswerMap.get(questionId))
        } else {
          tempvalue[index] = {
            questionId,
            answer: questionAnswerMap.get(questionId)
          }
        }
      }
    })
    result.value = tempvalue
  }
}
</script>

<style scoped lang="less">
.van-button {
  flex: 1;
  border: 1px solid #8b8d9d;
  border-radius: 0%;
}
.chat {
  color: #343541;
}
#chatContainer {
  height: 100%;
  overflow: scroll;
  background-color: #181729;
}
::-webkit-scrollbar {
  display: none;
}
</style>
<style>
.text {
  max-width: 70vw;
}
.chat .next {
  display: none;
}
.chat:last-of-type .next {
  display: block;
}
.chat:last-of-type.disable .next {
  display: none;
}
</style>
