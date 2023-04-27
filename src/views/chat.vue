<template>
  <section class="top"></section>
  <div class="chat" v-for="item in currentChat" :key="item.content">
    <ChatBox :type="item.type" :content="item.content"></ChatBox>
  </div>
  <van-button type="primary" @click="submit" to="/accuracy"
    >下一页<van-icon name="guide-o"
  /></van-button>
</template>

<script setup>
const chatConfig = [
  {
    id: 1,
    chat: [
      {
        type: 'consultant',
        content:
          '客户您好！我是 HMS Investments 的投资顾问王经理，专门面向个人客户进行服务。我有 XX 年的投资服务经验，累计为 XX 位顾客制定了投资计划。下面我将通过一些问题了解您的个人情况，以为您制定合适的投资组合'
      },
      {
        type: 'consultant',
        content:
          '首先请您提供您的职业、年收入、流动资产、投资经验和风险偏好等信息，以便于我评估您的风险承受程度，随后为您制定合理的投资组合：（注：您填写的个人信息仅用来制定投资组合，不会被用来识别您的个人身份。'
      },
      {
        type: 'consultant',
        content: '1. 如果您的投资组合在一个月内损失了 10%，您会怎么做'
      },
      {
        type: 'radio',
        content: [
          '我会卖掉我所有的投资产品',
          '我会卖掉一些',
          '我什么都不做',
          '我会买进更多'
        ]
      },
      {
        type: 'input'
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
]
let currentChat = chatConfig[0].chat
// function submit(page) {
//   document.cookie = 'lastQuestion=' + page + ';'
//   this.$router.push({
//     path: '/chat/' + page + 1
//   })
// }
</script>

<style scoped lang="less">
.top {
  height: 37px;
  position: fixed;
  right: 0;
  top: 0;
}
.van-button {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
}
.chat {
  color: #343541;
  &:last-child {
    color: red;
  }
}
</style>
