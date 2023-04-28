<template>
  <div class="accuracy-box">
    <p>
      <slot />
    </p>
    <template v-if="type === 'rate'">
      <van-rate v-model="value" :count="10" void-icon="circle" icon="checked" />
      <div class="rate">
        <div>不真实</div>
        <div>完全真实</div>
      </div>
    </template>
    <template v-if="type === 'radio'">
      <van-radio-group v-model="checked">
        <van-radio v-for="choice in content" :key="choice" :name="choice">{{
          choice
        }}</van-radio>
      </van-radio-group>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: String,
  content: Array
})

let value = ref(0)
let checked = ref('')
</script>

<style scoped>
.rate {
  display: flex;
  justify-content: space-between;
}
</style>
