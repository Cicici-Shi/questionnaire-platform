<script setup>
import { useLoadingStore } from '@/store'
import { storeToRefs } from 'pinia'
const store = useLoadingStore()
const { show } = storeToRefs(store)
console.log('show : ', show)
</script>

<template>
  <van-overlay :show="show">
    <div class="loading">
      <van-loading type="spinner" />
    </div>
  </van-overlay>
  <router-view></router-view>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
