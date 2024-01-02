<template>
  <el-config-provider :locale="getFrameworkLocale" size="small">
    <app-provider>
      <router-view />
    </app-provider>
  </el-config-provider>
</template>

<script setup>
import { useLocale } from '@/install/locales/useLocale'

const { getFrameworkLocale } = useLocale()
</script>
