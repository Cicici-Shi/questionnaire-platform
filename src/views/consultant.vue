<template>
  <section class="top"></section>
  <div class="consultant container">
    <p>
      您是一位个人投资者，正打算使用在 HMS Investments
      开立的投资账户购买股票投资组合。选择投资标的过程中，该机构的一位投资顾问正在为您提供咨询服务
    </p>
    <img src="@/assets/avatar.png" alt="avatar" />
  </div>
  <van-button type="primary" to="/chat">下一页</van-button>
</template>

<script setup></script>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-height: 30vh;
}
.van-button {
  position: absolute;
  right: 10vw;
  bottom: 5vh;
}
</style>
