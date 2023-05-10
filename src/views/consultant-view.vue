<template>
  <div class="consultant container">
    <p style="text-indent: 2em; font-weight: 700">
      {{ consultant.content1 }}
    </p>
    <img :src="'/assets/' + consultant.img" />
    <p style="text-indent: 2em; font-weight: 700">
      {{ consultant.content2 }}
    </p>
    <footer class="footer-button">
      <van-button type="primary" :to="'/' + route.params.id + '/main'"
        >上一页</van-button
      >
      <van-button type="primary" :to="'/' + route.params.id + '/chat'"
        >下一页</van-button
      >
    </footer>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { getQuestionAPI } from '@/services/main'
import { useRoute } from 'vue-router'
const route = useRoute()
let consultant = ref({ content1: '', content2: '', img: '' })
onBeforeMount(() => {
  getQuestionAPI('consultant', route.params.id).then((res) => {
    const consultantInfo = res[1].consultant
    const content1 = consultantInfo.content1
    const content2 = consultantInfo.content2
    const img = consultantInfo.img
    consultant.value = {
      content1,
      content2,
      img
    }
  })
})
</script>

<style scoped>
.van-button {
  width: 50vw;
  border: 1px solid #343541;
  margin-top: 2em;
}
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
</style>
