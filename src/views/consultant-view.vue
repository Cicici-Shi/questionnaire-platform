<template>
  <div class="consultant container">
    <p style="text-indent: 2em; font-weight: 700">
      {{ consultant.content1 }}
    </p>
    <img :src="consultant.img" />
    <p style="text-indent: 2em; font-weight: 700">
      {{ consultant.content2 }}
    </p>
    <footer class="footer-button">
      <van-button type="primary" :to="'/' + route.params.id + '/chat'"
        >下一页</van-button
      >
    </footer>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, onMounted } from 'vue'
import { getQuestionAPI } from '@/services/main'
import { useRoute } from 'vue-router'
import { useLoadingStore } from '@/store'

const store = useLoadingStore()
const route = useRoute()
let consultant = ref({ content1: '', content2: '', img: '' })

onBeforeMount(async () => {
  store.startLoading()
  await getQuestionAPI('consultant', route.params.id).then((res) => {
    const consultantInfo = res[1].consultant
    const content1 = consultantInfo.content1
    const content2 = consultantInfo.content2
    const img =
      consultantInfo.img?.indexOf('http') > -1
        ? consultantInfo.img
        : '/assets/' + consultantInfo.img
    consultant.value = {
      content1,
      content2,
      img
    }
  })
})

onMounted(() => {
  store.stopLoading()
})
</script>

<style scoped>
.van-button {
  flex: 1;
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
