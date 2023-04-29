<template>
  <div class="accuracy-box">
    <p>
      <slot />
    </p>
    <template v-if="type === 'rate'">
      <van-rate v-model="value" :count="10" void-icon="circle" icon="checked" />
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

<style scoped lang="less">
.van-rate {
  position: relative;
  margin-bottom: 15px;
  &::before {
    content: '不真实';
    position: absolute;
    left: 0;
    bottom: -25px;
  }
  &::after {
    content: '真实';
    position: absolute;
    right: 0;
    bottom: -25px;
  }
}
</style>
