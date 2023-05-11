<template>
  <div class="rate-num">
    <div class="label">{{ label }}</div>
    <div class="num">
      <div
        v-for="n in range"
        :key="n"
        class="num-item"
        :value="modelValue"
        @click="!disabled ? handleClick(n) : () => {}"
        :class="{ checked: modelValue === n, disabled: disabled }"
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
  label: String,
  disabled: Boolean
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
.disabled {
  background-color: rgba(235, 237, 240, 0.7);
  color: grey;
}
.checked.disabled {
  background-color: rgba(90, 151, 232, 0.9);
  border: 1px solid #5997e9;
  color: white;
}
.desc {
  display: flex;
  justify-content: space-between;
}
</style>
