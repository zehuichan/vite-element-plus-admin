<template>
  <el-config-provider>
    <app-provider>
      <router-view />
    </app-provider>
  </el-config-provider>
</template>

<script setup>
// eslint-disable-next-line no-undef
console.table(__APP_INFO__)
</script>
