<template>
  <div class="error-page">
    <div class="cont">
      <div class="title">500</div>
      <div class="info">抱歉，服务器出错了</div>
      <div class="button-wrapper">
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
