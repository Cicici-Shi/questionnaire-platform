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
        :explain="item.explain"
        @newBtnClick="handleNewData"
      ></ChatBox>
    </div>
    <van-button v-if="disable" type="primary" @click="submit" to="/accuracy"
      >下一页<van-icon name="guide-o"
    /></van-button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const chatConfig = [
  {
    id: 1,
    chat: [
      {
        type: 'consultant',
        content:
          '客户您好！我是 HMS Investments 的投资顾问王经理，专门面向个人客户进行服务。我有 XX 年的投资服务经验，累计为 XX 位顾客制定了投资计划。下面我将通过一些问题了解您的个人情况，以为您制定合适的投资组合。'
      },
      {
        type: 'consultant',
        content:
          '首先请您提供您的职业、年收入、流动资产、投资经验和风险偏好等信息，以便于我评估您的风险承受程度，随后为您制定合理的投资组合：（注：您填写的个人信息仅用来制定投资组合，不会被用来识别您的个人身份。'
      },
      {
        type: 'consultant',
        content: '1. 如果您的投资组合在一个月内损失了 10%，您会怎么做？'
      },
      {
        type: 'radio',
        content: [
          '我会卖掉我所有的投资产品',
          '我会卖掉一些',
          '我什么都不做',
          '我会买进更多'
        ]
      }
    ]
  },
  {
    id: 2,
    chat: [
      {
        type: 'consultant',
        content: '2. 您的流动净资产是多少万元?',
        explain:
          '注：个人流动净资产主要包括：现金、活期储蓄等可以随时变现的资金(这有助于我们评估您的投资潜力，提供估计值即可。)'
      },
      {
        type: 'input'
      }
    ]
  },
  {
    id: 3,
    chat: [
      {
        type: 'consultant',
        content: '3. 您的税前年收入是多少万元？',
        explain:
          '(这有助于我们根据您的财务状况建立个性化的投资组合，提供估计值即可。)'
      },
      {
        type: 'input'
      }
    ]
  }
  // {
  //   id: 4,
  //   chat: [
  //     {
  //       type: 'consultant',
  //       content: '4. 您投资时最关注的是？',
  //       explain: '(这有助于我们平衡您的预期风险和回报。)'
  //     },
  //     {
  //       type: 'radio',
  //       content: [
  //         '收益最大化',
  //         '损失最小化',
  //         '“收益最大化” 和 “损失最小化” 两者同等重要'
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 5,
  //   chat: [
  //     {
  //       type: 'consultant',
  //       content: '5. 您目前的就业情况是:'
  //     },
  //     {
  //       type: 'radio',
  //       content: [
  //         '在职（全职或兼职）',
  //         '自由职业者',
  //         '全职妈妈或爸爸',
  //         '学生',
  //         '待业',
  //         '退休'
  //       ]
  //     }
  //   ]
  // }
]
let current = ref(0)
let currentChat = ref(chatConfig[0].chat)
const disable = ref(false)

let handleNewData = () => {
  console.log(current.value)
  console.log(chatConfig.length - 1)
  current.value++

  currentChat.value.push(...chatConfig[current.value].chat)
  if (current.value === chatConfig.length - 1) {
    disable.value = true
  }

  nextTick(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
}

// function submit(page) {
//   document.cookie = 'lastQuestion=' + page + ';'
//   this.$router.push({
//     path: '/chat/' + page + 1
//   })
// }
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
