<template>
  <section class="top"></section>
  <div class="main main-container">
    <p>尊敬的先生、女士：</p>
    <div class="content">
      <p>
        您好，感谢您参与这项研究！本研究希望了解个人投资者在投资顾问帮助下进行投资决策的相关情况，请您务必独立完成。您将完全匿名地完成后续问题，
        所有信息仅用于学术研究，我们不会利用所填信息来识别您的个人身份，研究结果将严格保密。
      </p>
      <p>
        您的身份是一位打算进行股票投资的个人投资者，需要根据所给信息做出决策。您的回答没有对错之分，只要是您个人的真实想法，即为最佳答案。
      </p>
      <p>请尽量抽出 10 分钟左右的连续时间来完成。</p>
      <p>完成过程中如果您有任何疑问请联系：</p>
      <p>孙岩 哈尔滨工业大学教授</p>
      <p><a href="mailto:sunyan2021@hit.edu.cn">sunyan2021@hit.edu.cn</a></p>
      <p>孙芳芳 哈尔滨工业大学副教授</p>
      <p><a href="mailto:fangfang@hit.edu.cn">fangfang@hit.edu.cn</a></p>
    </div>
    <p>如果您同意参加本项研究，请点击“同意”并进入下一页开始</p>
    <div class="agree">
      <van-button type="primary" :to="'/' + route.params.id + '/consultant'"
        >同意</van-button
      >
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { loginAPI } from '@/services/user'
import { useRoute } from 'vue-router'
import { useLoadingStore } from '@/store'
const store = useLoadingStore()
onBeforeMount(async () => {
  store.startLoading()
  await loginAPI()
})
onMounted(() => {
  store.stopLoading()
})
const route = useRoute()
</script>

<style scoped lang="less">
.content {
  border-bottom: 1px solid #222;
  p {
    text-indent: 2em;
  }
}
</style>
