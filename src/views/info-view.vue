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
            :label="item.stem"
            :error-message="value[index] || isNew ? '' : '请输入'"
          >
            <template #input>
              <RateNum
                v-model="value[index]"
                :start="item.low"
                :range="item.height"
                :former="item.lowText"
                :latter="item.highText"
              ></RateNum>
            </template>
          </van-field>
        </template>
      </van-cell-group>
      <div class="footer-button">
        <van-button
          block
          type="primary"
          :to="'/' + route.params.id + '/accuracy'"
        >
          上一页
        </van-button>
        <van-button
          block
          type="primary"
          native-type="submit"
          @click="isNew = false"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { getQuestionAPI, submitAPI } from '@/services/main'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
let infoConfig = ref([])
let isNew = ref(true)
onBeforeMount(async () => {
  await getQuestionAPI('info', route.params.id).then((res) => {
    infoConfig.value = JSON.parse(
      JSON.stringify(
        res[1].info.map((item) => {
          let data = {
            stem: item.questionContent,
            type: item.answerType,
            id: item.id,
            low: item.low,
            height: item.height,
            lowText: item.lowText,
            highText: item.highText
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
  errMsg.value = ref(Array(infoConfig.value.length).fill(''))
})

let value = ref([])
let year = ref('')
let month = ref('')
let errMsg = ref([])

let result = []
const router = useRouter()
const onSubmit = () => {
  for (let i = 0; i < infoConfig.value.length; i++) {
    if (infoConfig.value[i].type === 'rate' && !value.value[i]) {
      console.log('请完整输入表单')
      return
    }
  }
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
      answer: JSON.stringify([year.value, month.value])
    }
  }
  submitAPI('info', result, route.params.id).then(() => {
    router.push(`/${route.params.id}/end`)
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
.footer-button {
  left: 0;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100vw;
}

.van-button {
  width: 50vw;
  border: 1px solid #8b8d9d;
  border-radius: 0%;
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
.rate-num {
  width: 100%;
}
</style>
<style lang="less">
.van-field__control {
  min-height: 46px;
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
.van-field__value input {
  text-align: center;
}
</style>
