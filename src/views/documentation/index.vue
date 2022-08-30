<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Documentation'
})
</script>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style></style>
