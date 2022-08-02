<template>
  <div class="trigger tap-active" @click="trigger">
    <el-icon v-if="opened">
      <Expand />
    </el-icon>
    <el-icon v-if="!opened">
      <fold />
    </el-icon>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const opened = ref(true)

const trigger = () => {
  opened.value = !opened.value
}
</script>

<style>
.trigger {
  display: flex;
  align-items: center;
  padding: 8px;
  height: 48px;
  box-sizing: border-box;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
}
</style>
