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
import { useRouter } from 'vue-router'

onBeforeMount(() => {
  window.scrollTo(0, 0)
})
let value = ref(Array(10).fill(null))
let accuracyConfig = [
  {
    type: 'rate',
    stem: '1. 在问题“如果您的投资组合在一个月内损失了10%，您会怎么做?”中，您给出的回答是 ，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '2. 在问题“您的流动净资产是多少？”中，您给出的回答是 万元，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '3. 在问题“您的税前年收入是多少？”中，您给出的回答是 万元，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '4. 在问题“您投资时最关注的是？”中，您给出的回答是 ，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '5. 在问题“您目前的就业状况” 中，您给出的回答是 ，您回答的真实程度为'
  },
  {
    type: 'rate',
    stem: '6. 在问题“您有多少投资经验？”中，您给出的回答是 ，您回答的真实程度为：'
  },
  {
    type: 'radio',
    stem: '7. 您认为以下哪个选项是正确的?',
    content: ['我的投资顾问是真人', '我的投资顾问是 AI']
  }
]
const router = useRouter()
const onSubmit = () => {
  router.push('/info')
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
