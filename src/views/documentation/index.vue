<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style lang="scss">
.app-container {
  padding: 16px;
  margin: 16px 16px 0;
  background-color: #fff;
}
</style>
