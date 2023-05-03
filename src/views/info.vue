<template>
  <section class="top name">HMS Investments</section>
  <div class="accuracy">
    <p style="font-weight: 700">最后，请填写您的其他人口统计信息：</p>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <template v-for="(item, index) in infoConfig" :key="item.id">
          <van-field
            v-if="item.type === 'radio'"
            name="radio"
            :label="item.stem"
            :rules="[{ required: true, message: '请输入' }]"
          >
            <template #input>
              <van-radio-group v-model="value[index]" direction="horizontal">
                <van-radio
                  v-for="choice in item.content"
                  :key="choice"
                  :name="choice"
                  >{{ choice }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-if="item.type === 'input'"
            v-model="value[index]"
            :label="item.stem"
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入' }]"
          />
          <div class="yoe" v-if="item.type === 'year_month'">
            <van-field
              v-model="year"
              name="year"
              :label="item.stem"
              placeholder="请输入"
              :rules="[{ required: true, message: '请输入' }]"
            />
            <div class="mark">年</div>
            <van-field
              v-model="month"
              name="month"
              placeholder="请输入"
              :rules="[{ required: true, message: '请输入' }]"
            />
            <div class="mark">月</div>
          </div>
          <van-field
            v-if="item.type === 'rate'"
            name="rate"
            :label="item.stem"
            :rules="[{ required: true, message: '请输入' }]"
          >
            <template #input>
              <van-rate
                v-model="value[index]"
                :count="10"
                void-icon="circle"
                icon="checked"
              />
            </template>
          </van-field>
        </template>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { getQuestionAPI, submitAPI } from '@/services/main'
import { showSuccessToast } from 'vant'
import { useRoute } from 'vue-router'
const route = useRoute()

let infoConfig = ref([])
onBeforeMount(async () => {
  await getQuestionAPI('info').then((res) => {
    infoConfig.value = JSON.parse(
      JSON.stringify(
        res[1].info.map((item) => {
          let data = {
            stem: item.questionContent,
            type: item.answerType,
            id: item.id
          }
          if (item.answerContent) {
            data.content = JSON.parse(item.answerContent).map((str) =>
              str.trim()
            )
          }
          return data
        })
      )
    )
  })
})

let value = ref([])
let year = ref('')
let month = ref('')
let result = []
const onSubmit = () => {
  result = value.value.map((item, index) => {
    return {
      questionId: infoConfig.value[index].id,
      answer: item
    }
  })
  const index = infoConfig.value.findIndex((item) => item.type === 'year_month')
  if (index !== -1) {
    result[index] = {
      questionId: infoConfig.value[index].id,
      answer: `${year.value} '-' ${month.value}`
    }
  }
  submitAPI('info', result, route.params.id).then(() => {
    // 跳转或弹窗
    showSuccessToast('提交成功！')
  })
}
</script>

<style scoped lang="less">
.accuracy {
  padding: 40px 1rem;
}
.van-rate {
  display: flex;
  justify-content: space-evenly;
}
.van-button {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
}
.van-cell-group--inset {
  margin: 0;
}
.van-cell {
  background: #f7f7f8;
}
.van-rate {
  position: relative;
  margin-bottom: 27px;
  &::before {
    content: '非常少';
    position: absolute;
    left: 0;
    bottom: -25px;
  }
  &::after {
    content: '非常多';
    position: absolute;
    right: 0;
    bottom: -25px;
  }
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
  background-color: #fff;
}
</style>
<style lang="less">
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
.yoe {
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
  .van-field:first-child label {
    position: fixed;
    z-index: 9;
  }
  .van-cell__value {
    padding-top: 1.5em;
  }
  .mark {
    margin: 0 5px 20px;
  }
}
</style>
