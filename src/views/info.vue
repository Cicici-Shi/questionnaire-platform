<template>
  <section class="top name">HMS Investments</section>
  <div class="accuracy">
    <p style="font-weight: 700">最后，请填写您的其他人口统计信息：</p>
    <p>1. 您的性别是？</p>
    <van-radio-group v-model="checked">
      <van-radio name="A">男</van-radio>
      <van-radio name="B">女</van-radio>
    </van-radio-group>
    <p>2. 您的年龄是？</p>
    <van-cell-group inset>
      <van-field v-model="age" placeholder="请输入" />
    </van-cell-group>
    <p>3. 您参加工作多长时间了？</p>
    <div class="yoe">
      <van-cell-group inset>
        <van-field v-model="year" placeholder="请输入" />
      </van-cell-group>
      <div>年</div>
      <van-cell-group inset>
        <van-field v-model="month" placeholder="请输入" />
      </van-cell-group>
      <div>个月</div>
    </div>
    <p>4. 您在真人投资顾问的帮助下进行股票投资的经验如何？</p>
    <van-rate v-model="exp" :count="10" void-icon="circle" icon="checked" />
    <div class="rate">
      <div>非常少</div>
      <div>非常多</div>
    </div>
    <p>5. 您以往股票投资亏损的次数占股票投资总次数的比例约为？（单位：%）</p>
    <van-cell-group inset>
      <van-field v-model="percent" placeholder="请输入" />
    </van-cell-group>
    <van-button type="primary">提交问卷</van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let checked = ref('')
let age = ref('')
let year = ref('')
let month = ref('')
let exp = ref('')
let percent = ref('')
</script>

<style scoped lang="less">
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
.van-cell-group--inset {
  margin: 0;
}
.van-cell {
  background: #f7f7f8;
}
.yoe {
  display: flex;
  div {
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin: 0 2px;
  }
}
</style>
