<template>
  <a-image :width="200" :src="imageUrl" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  }
})
</script>
