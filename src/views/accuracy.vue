<template>
  <section class="top name">HMS Investments</section>
  <div class="accuracy">
    <p style="text-indent: 2em; font-weight: 700">
      投资顾问对您的服务已经结束。因为研究中需要了解您刚刚填写的“用于评估风险承受程度的个人信息”的真实程度如何，所以请您就以上回答的真实程度逐一做出评价:
    </p>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-for="(item, index) in accuracyConfig"
          :key="item.stem"
          name="rate"
          :label="item.stem"
          :rules="[{ required: true, message: '请输入' }]"
        >
          <template #input>
            <van-radio-group
              v-model="value[index]"
              direction="horizontal"
              v-if="item.type === 'radio'"
            >
              <van-radio
                v-for="choice in item.content"
                :key="choice"
                :name="choice"
                >{{ choice }}</van-radio
              >
            </van-radio-group>
            <van-rate
              v-model="value[index]"
              :count="10"
              void-icon="circle"
              icon="checked"
              v-else
            />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">
          下一页<van-icon name="guide-o" />
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getQuestionAPI, submitAPI } from '@/services/main'

let accuracyConfig = ref([])
let value = ref(Array(accuracyConfig.value.length).fill(null))

onBeforeMount(() => {
  window.scrollTo(0, 0)
  getQuestionAPI('accuracy').then((res) => {
    accuracyConfig.value = res[1].accuracy.map((item) => {
      let data = {
        stem: item.stem,
        type: item.type,
        id: item.id
      }
      if (item.content) {
        data.content = JSON.parse(item.content).map((str) => str.trim())
      }
      return data
    })
  })
})

const router = useRouter()
let result = ref([])
const route = useRoute()
const onSubmit = () => {
  result.value = value.value.map((item, index) => {
    return {
      questionId: accuracyConfig.value[index].id,
      answer: item
    }
  })
  submitAPI('accuracy', result.value, route.params.id).then(() => {
    router.push(`/${route.params.id}/info`)
  })
}
</script>

<style scoped lang="less">
.accuracy {
  padding: 40px 1rem 60px;
}
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
.van-button {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
}
.van-field {
  flex-direction: column;
  margin-bottom: 10px;
}
.van-cell-group {
  margin: 0;
}
.van-cell {
  padding: 0;
}
</style>

<style>
.van-field__control {
  height: 46px;
}
.van-field__label {
  width: 100%;
}
.van-rate__icon--full {
  color: #5997e9;
}
.van-radio__icon--checked .van-icon {
  background-color: #5997e9;
  border-color: #5997e9;
}
</style>
