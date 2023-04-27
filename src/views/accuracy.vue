<template>
  <section class="top"></section>
  <div class="accuracy">
    <p style="text-indent: 2em; font-weight: 700">
      投资顾问对您的服务已经结束。因为研究中需要了解您刚刚填写的“用于评估风险承受程度的个人信息”的真实程度如何，所以请您就以上回答的真实程度逐一做出评价:
    </p>
    <p>
      1. 在问题“如果您的投资组合在一个月内损失了
      10%，您会怎么做?”中，您给出的回答是 ，您回答的真实程度为
    </p>
    <van-rate v-model="value" :count="10" void-icon="circle" icon="checked" />
    <div class="rate">
      <div>不真实</div>
      <div>完全真实</div>
    </div>
    <van-button type="primary" to="/info"
      >下一题<van-icon name="guide-o"
    /></van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let value = ref('0')
</script>

<style scoped>
.top {
  height: 37px;
  position: fixed;
  right: 0;
  top: 0;
}
.accuracy {
  padding: 40px 1rem;
}
.van-rate {
  display: flex;
  justify-content: space-evenly;
}
.rate {
  display: flex;
  justify-content: space-between;
}
.van-button {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
}
</style>
