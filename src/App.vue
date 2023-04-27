<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.onpopstate = function () {
    history.go(1)
  }
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
