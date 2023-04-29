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
        <p v-if="type === 'consultant'" style="color: #777; font-size: 0.6em">
          {{ explain }}
        </p>
        <van-radio-group v-if="type === 'radio'" v-model="value" @change="emit">
          <van-radio v-for="choice in content" :key="choice" :name="choice">{{
            choice
          }}</van-radio>
        </van-radio-group>
        <van-cell-group v-if="type === 'input'" inset>
          <van-field v-model="value" placeholder="请输入" />
        </van-cell-group>
        <van-button
          class="next"
          v-if="type != 'consultant'"
          @click="handleNewClick"
          color="#5997e9"
          :disabled="!value"
          >继续<van-icon name="arrow"
        /></van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  type: String,
  explain: String,
  content: [String, Array]
})
const emit = defineEmits(['newBtnClick', 'resultChange'])

let value = ref('')
const handleNewClick = () => {
  emit('newBtnClick')
}
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
.next {
  color: #fff;
  float: right;
  margin-top: 10px;
  padding: 0.1em 0.3rem;
  border-radius: 0.2rem;
  height: 32px;
  .van-icon {
    margin-left: 3px;
  }
}
</style>
