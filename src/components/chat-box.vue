<template>
  <div class="chat-box">
    <div class="text-base">
      <div class="avatar">
        <img
          v-if="type === 'consultant'"
          src="@/assets/avatar.png"
          alt="avatar"
        />
        <div v-else class="me"></div>
      </div>
      <div class="text">
        <div v-if="type === 'consultant'">{{ content }}</div>
        <van-radio-group v-if="type === 'radio'" v-model="checked">
          <van-radio v-for="choice in content" :key="choice" :name="choice">{{
            choice
          }}</van-radio>
        </van-radio-group>
        <van-cell-group v-if="type === 'input'" inset>
          <van-field v-model="value" placeholder="请输入" />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  type: String,
  content: [String, Array]
})
let checked = ref('')
</script>

<style scoped lang="less">
.chat-box {
  display: flex;
  padding: 1rem;

  .text-base {
    display: flex;
  }
}
.avatar {
  width: 30px;
  height: 30px;
  box-sizing: border-box;

  img {
    width: 30px;
  }
}
.me {
  width: 30px;
  height: 40px;
  background-color: #7d8b8d;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: '我';
    font-weight: bold;
    color: #fff;
  }
}
.text {
  padding: 0.5rem 1rem;
  margin-left: 0.9rem;
  background-color: #f7f7f8;
  border-radius: 0.375rem;
}
.van-cell-group--inset {
  margin: 0;
}
</style>
