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
    <van-button
      v-if="disable"
      type="primary"
      @click="submit"
      :to="'/' + route.params.id + '/accuracy'"
      >下一页<van-icon name="guide-o"
    /></van-button>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getQuestionAPI, submitAPI } from '@/services/main'
import { scrollToBottom } from '@/utils/scroll'

const chatConfig = [
  {
    id: 0,
    chat: [
      {
        type: 'consultant',
        content:
          '客户您好！我是 HMS Investments 的投资顾问王经理，专门面向个人客户进行服务。我有 XX 年的投资服务经验，累计为 XX 位顾客制定了投资计划。下面我将通过一些问题了解您的个人情况，以为您制定合适的投资组合。'
      },
      {
        type: 'consultant-1',
        content:
          '首先请您提供您的职业、年收入、流动资产、投资经验和风险偏好等信息，以便于我评估您的风险承受程度，随后为您制定合理的投资组合：（注：您填写的个人信息仅用来制定投资组合，不会被用来识别您的个人身份。'
      }
    ]
  }
]
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
    currentChat.value.push(...questionList.value[0].chat)
    chatConfig.push(...questionList.value.slice(1, questionList.value.length))
  })
})

let handleNewData = () => {
  if (current.value === chatConfig.length - 1) {
    disable.value = true
    return
  }

  current.value++

  setTimeout(() => {
    let i = 0
    currentChat.value.push(chatConfig[current.value].chat[i])
    i++
    while (i < chatConfig[current.value].chat.length) {
      currentChat.value.push(chatConfig[current.value].chat[i])
      i++
      nextTick(() => {
        scrollToBottom()
      })
    }
  }, 150)
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
    router.push('/accuracy')
  })
}
</script>

<style scoped lang="less">
.van-button {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
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
