<template>
  <div class="exception-page">
    <el-result title="500" icon="error" sub-title="抱歉，服务器报告错误。">
      <template #icon>
        <svg-icon name="500" size="250" />
      </template>
      <template #extra>
        <el-button type="primary" @click="go(PageEnum.BASE_LOGIN, true)">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useGo } from '@/hooks/web/usePage'
import { PageEnum } from '@/enums/pageEnum'

const go = useGo()
</script>

<style lang="scss">
.exception-page {
  padding: 128px 32px;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>
