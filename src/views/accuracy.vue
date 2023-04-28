<template>
  <section class="top name">HMS Investments</section>
  <div class="accuracy">
    <p style="text-indent: 2em; font-weight: 700">
      投资顾问对您的服务已经结束。因为研究中需要了解您刚刚填写的“用于评估风险承受程度的个人信息”的真实程度如何，所以请您就以上回答的真实程度逐一做出评价:
    </p>
    <AccuracyBox
      v-for="item in accuracyConfig"
      :key="item.stem"
      :type="item.type"
      :content="item.content"
      >{{ item.stem }}</AccuracyBox
    >
    <van-button type="primary" to="/info"
      >下一页<van-icon name="guide-o"
    /></van-button>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  window.scrollTo(0, 0)
})
let accuracyConfig = [
  {
    type: 'rate',
    stem: '1. 在问题“如果您的投资组合在一个月内损失了10%，您会怎么做?”中，您给出的回答是 ，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '2. 在问题“您的流动净资产是多少？”中，您给出的回答是 万元，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '3. 在问题“您的税前年收入是多少？”中，您给出的回答是 万元，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '4. 在问题“您投资时最关注的是？”中，您给出的回答是 ，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '5. 在问题“您目前的就业状况” 中，您给出的回答是 ，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '6. 在问题“您有多少投资经验？”中，您给出的回答是 ，您回答的真实程度为：'
  },
  {
    type: 'radio',
    stem: '7. 您认为以下哪个选项是正确的?',
    content: ['我的投资顾问是真人', '我的投资顾问是 AI']
  }
]
</script>

<style scoped>
.accuracy {
  padding: 40px 1rem;
}
.van-rate {
  display: flex;
  justify-content: space-evenly;
}
.van-button {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
}
</style>
