<template>
  <section class="top"></section>
  <div class="main-container">
    <div>您的答卷已经提交，感谢您的参与！</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLoadingStore } from '@/store'
const store = useLoadingStore()
onMounted(() => {
  store.stopLoading()
})
</script>

<style scoped lang="less">
div {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #02295a;
  font-weight: 700;
}
</style>
