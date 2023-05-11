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
onBeforeMount(() => {
  store.startLoading()
  console.log('isChat2() : ', isChat2())
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
            questionList.splice(i, 1)
            break
          }
          questionList[i + 1].chat.unshift(...formatChat)
          questionList.splice(i, 1)
          i--
        }
      }
      currentChat.value.push(...questionList[0].chat)
      chatConfig.push(...questionList)
    }
  )
})
onMounted(() => {
  store.stopLoading()
})

let handleNewData = () => {
  if (current.value === chatConfig.length - 1) {
    disable.value = true
    return
  }

  current.value++

  let i = 0
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
  }, 200)
}

let result = ref([])
let handleResult = (resultItem) => {
  const index = result.value.findIndex(
    (item) => item.questionId === resultItem.questionId
  )
  if (index !== -1) {
    result.value[index] = resultItem
  } else {
    result.value.push(resultItem)
  }
}
const router = useRouter()
const route = useRoute()
const questionNaireId = route.params.id

const saveData = () => {
  store.startLoading()
  submitAPI('question', result.value, false, questionNaireId).then(
    () => {
      if (specicalQuestionList.includes(questionNaireId) && isChat2()) {
        router.push('/' + questionNaireId + '/chat')
      } else {
        router.push('/' + questionNaireId + '/consultant')
      }
    },
    () => {
      store.stopLoading()
    }
  )
}

const submit = () => {
  store.startLoading()
  submitAPI('question', result.value, true, questionNaireId).then(
    async () => {
      console.log('include : ', specicalQuestionList.includes(questionNaireId))
      console.log('isChat2 : ', !isChat2())
      if (specicalQuestionList.includes(questionNaireId) && !isChat2()) {
        await router.push('/' + questionNaireId + '/chat2')
        location.reload()
      } else {
        router.push(`/${route.params.id}/accuracy`)
      }
    },
    () => {
      store.stopLoading()
    }
  )
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
