<template>
  <section class="top name">HMS Investments</section>
  <div class="accuracy">
    <p style="text-indent: 2em; font-weight: 700">
      投资顾问对您的服务已经结束。因为研究中需要了解您刚刚填写的“用于评估风险承受程度的个人信息”的真实程度如何，所以请您就以上回答的真实程度逐一做出评价:
    </p>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <template v-for="(item, index) in accuracyConfig" :key="item.stem">
          <van-field
            v-if="item.type === 'radio'"
            name="radio"
            :label="item.stem"
            :rules="[{ required: true, message: '请输入' }]"
          >
            <template #input>
              <van-radio-group v-model="value[index]" direction="horizontal">
                <van-radio
                  :disabled="done"
                  v-for="choice in item.content"
                  :key="choice"
                  :name="choice"
                  >{{ choice }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>
          <van-field
            v-if="item.type === 'rate'"
            :label="item.stem"
            :error-message="value[index] || isNew ? '' : '请输入'"
          >
            <template #input>
              <RateNum
                :disabled="done"
                v-model="value[index]"
                :start="item.low"
                :range="item.height"
                :former="item.lowText"
                :latter="item.highText"
              ></RateNum>
            </template>
          </van-field>
          <van-field
            class="multi"
            v-if="item.type === 'multi'"
            :label="item.stem.main"
            :error-message="
              isNew
                ? ''
                : isEmpty
                ? '请输入'
                : isSumTen
                ? ''
                : '总分必须等于10分'
            "
          >
            <template #input>
              <RateNum
                :disabled="done"
                v-for="(little, i) in item.stem.littles"
                :key="little"
                :label="little.stem"
                v-model="multiValue[i]"
                :start="little.low"
                :range="little.height"
                :former="little.lowText"
                :latter="little.highText"
              ></RateNum>
            </template>
          </van-field>
          <div v-if="item.type === 'multi'">
            您按照重要程度给上述三个方面分配的分值依次为(
            {{ multiValue[0] }} )分、（ {{ multiValue[1] }} ）分、（
            {{ multiValue[2] }} ）分。 请注意：总分必须等于10分。
          </div>
        </template>
      </van-cell-group>
      <div style="margin-top: 16px" class="footer-button">
        <van-button block type="primary" @click="saveData"> 上一页 </van-button>
        <van-button
          block
          type="primary"
          native-type="submit"
          @click="isNew = false"
        >
          下一页
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getQuestionAPI, submitAPI } from '@/services/main'
import { useLoadingStore } from '@/store'
import { specicalQuestionList } from '@/utils'

let accuracyConfig = ref([])
let value = ref([])
let isNew = ref(true)
let errMsg = ref([])
let indexes = ref([])
let multiValue = ref(Array(3).fill(null))
let done = ref(false)
const router = useRouter()
let result = ref([])
const route = useRoute()
const store = useLoadingStore()

const isEmpty = computed(() => multiValue.value.some((value) => value == null))
const isSumTen = computed(
  () => multiValue.value.reduce((acc, value) => acc + value, 0) === 10
)

onBeforeMount(async () => {
  window.scrollTo(0, 0)
  await getQuestionAPI('accuracy', route.params.id).then((res) => {
    done.value =
      res[1].accuracyResult &&
      res[1].accuracyResult[0] &&
      res[1].accuracyResult[0].done
    accuracyConfig.value = res[1].accuracy.map((item) => {
      let data = {
        stem: item.stem,
        type: item.type,
        id: item.id,
        low: item.low,
        height: item.height,
        lowText: item.lowText,
        highText: item.highText
      }
      if (item.type == 'multi') {
        data.stem = JSON.parse(item.stem)
      }
      if (item.content) {
        data.content = JSON.parse(item.content).map((str) => str.trim())
      }
      return data
    })
    indexes.value = accuracyConfig.value.reduce((acc, obj, index) => {
      if (obj.type == 'multi') {
        acc.push(index)
      }
      return acc
    }, [])
    if (done.value) {
      accuracyConfig.value.forEach((item) => {
        const accuracy = res[1].accuracyResult[0].resultDetail.find((a) => {
          if (a.accuracyQuestionId === item.id) return a
        })
        item.result = accuracy.answer
      })
    } else {
      errMsg.value = ref(Array(accuracyConfig.value.length).fill(''))
    }
    recoverData(res[1].accuracyResult)
  })
})

const saveData = () => {
  store.startLoading()
  if (done.value) {
    navToPrevPage()
  } else {
    result.value = wrapResult()
    submitAPI('accuracy', result.value, false, route.params.id).then(() => {
      navToPrevPage()
    })
  }
}

const navToPrevPage = () => {
  const questionNaireId = route.params.id
  if (specicalQuestionList.includes(questionNaireId)) {
    router.push('/' + route.params.id + '/chat2')
  } else {
    router.push('/' + route.params.id + '/chat')
  }
}

const onSubmit = () => {
  if (done.value) {
    router.push(`/${route.params.id}/info`)
  } else {
    if (checkForm()) {
      result.value = wrapResult()
      submitAPI('accuracy', result.value, true, route.params.id).then(() => {
        router.push(`/${route.params.id}/info`)
      })
    }
  }
}

const recoverData = (resultlist) => {
  if (resultlist.length) {
    const answerObjList = resultlist[0].resultDetail
    const questionAnswerMap = new Map()
    answerObjList.forEach((ansObj) => {
      questionAnswerMap.set(ansObj.accuracyQuestionId, ansObj.answer)
    })
    const tempvalue = []
    accuracyConfig.value.forEach((config, index) => {
      const questionId = config.id
      if (questionAnswerMap.has(questionId)) {
        if (config.type == 'rate') {
          tempvalue[index] = parseInt(questionAnswerMap.get(questionId))
        } else if (config.type == 'multi') {
          multiValue.value = JSON.parse(questionAnswerMap.get(questionId))
        } else {
          tempvalue[index] = questionAnswerMap.get(questionId)
        }
      }
    })
    value.value = tempvalue
  }
}

const wrapResult = () => {
  const tempResult = []
  for (let index = 0; index < value.value.length; index++) {
    const item = value.value[index]
    const questionType = accuracyConfig.value[index].type
    tempResult[index] =
      questionType !== 'multi'
        ? item
          ? {
              questionId: accuracyConfig.value[index].id,
              answer: item
            }
          : null
        : multiValue.value
        ? {
            questionId: accuracyConfig.value[index].id,
            answer: JSON.stringify(multiValue.value)
          }
        : null
  }
  return tempResult.filter((item) => !!item)
}

const checkForm = () => {
  return accuracyConfig.value.every((config, index) => {
    if (config.type === 'multi' && isSumTen.value) {
      return true
    } else if (value.value[index]) {
      return true
    }
  })
}
</script>

<style scoped lang="less">
.accuracy {
  padding: 40px 1rem 90px;
  height: calc(100% - 90px);
  overflow: scroll;
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
.rate-num {
  width: 100%;
}
</style>

<style>
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
.multi .van-field__control {
  margin: 16px;
  display: flex;
  flex-direction: column;
}
</style>
