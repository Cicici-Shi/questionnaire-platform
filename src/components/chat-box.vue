<template>
  <div
    :class="
      type === 'consultant' || type === 'consultant-1'
        ? 'chat-box'
        : 'reverse-chat-box'
    "
  >
    <div class="text-base">
      <div
        class="avatar"
        v-if="type === 'consultant' || type === 'consultant-1'"
      >
        <img src="@/assets/avatar.png" alt="avatar" />
      </div>
      <div class="text">
        <div v-if="type === 'consultant' || type === 'consultant-1'">
          {{ content }}
        </div>
        <p v-if="type === 'consultant'" style="color: #777; font-size: 0.6em">
          {{ explain }}
        </p>
        <van-radio-group v-if="type === 'radio'" v-model="data">
          <van-radio v-for="choice in content" :key="choice" :name="choice">{{
            choice
          }}</van-radio>
        </van-radio-group>
        <van-cell-group v-if="type === 'input'" inset>
          <van-field v-model="data" placeholder="请输入" />
        </van-cell-group>
        <van-button
          class="next"
          v-if="type != 'consultant' && type != 'consultant-1'"
          @click="handleNewClick"
          color="#5997e9"
          :disabled="!data"
          >继续<van-icon name="arrow" /></van-button
        ><van-button
          class="next"
          v-if="type === 'consultant-1'"
          @click="handleNewClick"
          color="#5997e9"
          >继续<van-icon name="arrow"
        /></van-button>
      </div>
      <div class="avatar">
        <div
          v-if="type != 'consultant' && type != 'consultant-1'"
          class="me"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { watch } from 'vue'

const props = defineProps({
  type: String,
  explain: String,
  content: [String, Array],
  id: Number
})
const emit = defineEmits(['newBtnClick', 'resultChange'])

let data = ref('')
const handleNewClick = () => {
  emit('newBtnClick')
}
watch(data, (newValue, oldValue) => {
  let resultItem = { questionId: props.id, answer: data.value }
  emit('resultChange', resultItem)
})
</script>

<style scoped lang="less">
.reverse-chat-box {
  display: flex;
  padding: 1rem;
  flex-direction: row-reverse;

  .text-base {
    display: flex;
  }
  .text {
    margin-right: 0.8rem;
  }
}
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
