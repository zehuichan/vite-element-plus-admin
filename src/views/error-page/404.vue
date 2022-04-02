<template>
  <div class="error-page">
    <div class="cont">
      <div class="title">404</div>
      <div class="info">抱歉，你访问的页面不存在</div>
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
