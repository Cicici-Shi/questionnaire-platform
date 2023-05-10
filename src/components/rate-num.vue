<template>
  <div class="rate-num">
    <div class="label">{{ label }}</div>
    <div class="num">
      <div
        v-for="n in range"
        :key="n"
        class="num-item"
        :value="modelValue"
        @click="handleClick(n)"
        :class="{ checked: modelValue === n }"
      >
        {{ start + n }}
      </div>
    </div>
    <div class="desc">
      <div class="former">{{ former }}</div>
      <div class="latter">{{ latter }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Number,
  former: String,
  latter: String,
  start: Number,
  range: Number,
  label: String
})
const emit = defineEmits(['update:modelValue'])
const handleClick = (n) => {
  emit('update:modelValue', n)
}
</script>

<style scoped>
.rate-num {
  margin-right: 16px;
}
.num {
  display: flex;
  justify-content: space-around;
}
.num-item {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #ccc;
}
.checked {
  background-color: #5997e9;
  color: #fff;
  border: 1px solid #5997e9;
}
.desc {
  display: flex;
  justify-content: space-between;
}
</style>
