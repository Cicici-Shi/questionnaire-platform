<template>
  <div id="chatContainer">
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
        v-if="disable"
        type="primary"
        :to="'/' + route.params.id + '/consultant'"
        >上一页</van-button
      >
      <van-button
        v-if="disable"
        type="primary"
        @click="submit"
        :to="'/' + route.params.id + '/accuracy'"
        >下一页</van-button
      >
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getQuestionAPI, submitAPI } from '@/services/main'
import { scrollToBottom } from '@/utils/scroll'

const chatConfig = []
let questionList = ref([])
let current = ref(0)
let currentChat = ref([])
const disable = ref(false)

onBeforeMount(() => {
  getQuestionAPI('question', route.params.id).then((res) => {
    questionList.value = res[1].question.map((item) => {
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
    })
    for (let i = 0; i < questionList.value.length; i++) {
      if (
        questionList.value[i].chat[questionList.value[i].chat.length - 1]
          .type === null
      ) {
        let formatChat = questionList.value[i].chat.slice(
          0,
          questionList.value[i].chat.length - 1
        )
        if (i + 1 >= questionList.value.length) {
          questionList.value.splice(i, 1)
          break
        }
        questionList.value[i + 1].chat.unshift(...formatChat)
        questionList.value.splice(i, 1)
        i--
      }
    }
    currentChat.value.push(...questionList.value[0].chat)
    chatConfig.push(...questionList.value)
  })
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

const submit = () => {
  submitAPI('question', result.value, route.params.id).then(() => {
    router.push(`/${route.params.id}/accuracy`)
  })
}
</script>

<style scoped lang="less">
.van-button {
  width: 50vw;
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
