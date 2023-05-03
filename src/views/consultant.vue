<template>
  <div class="consultant container">
    <p style="text-indent: 2em; font-weight: 700">
      您是一位个人投资者，正打算使用在 HMS Investments
      开立的投资账户购买股票投资组合。选择投资标的过程中，该机构的一位投资顾问正在为您提供咨询服务。
    </p>
    <img src="@/assets/avatar.png" alt="avatar" />
    <van-button round type="primary" :to="'/' + route.params.id + '/chat'"
      >下一页</van-button
    >
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.consultant {
  color: #fff;
  background-color: #181729;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-height: 30vh;
}
.van-button {
  margin-top: 2em;
}
</style>
