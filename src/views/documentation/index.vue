<template>
  <div class="app-container">
    <code>Documentation</code>
  </div>
  <div class="app-container">
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Documentation',
  setup() {
    const input = ref('')
    return {
      input
    }
  }
})
</script>

<style></style>
