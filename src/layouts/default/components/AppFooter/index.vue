<template>
  <el-footer class="basic-layout-footer">
    <span v-html="globAppFooter"></span>
    <span> ⋅ </span>
    <span v-html="globAppICP"></span>
  </el-footer>
</template>

<script setup>
const globAppFooter = import.meta.env.VITE_GLOB_APP_FOOTER
const globAppICP = import.meta.env.VITE_GLOB_APP_ICP
</script>

<style lang="scss">
.basic-layout-footer {
  text-align: center;
  padding: 24px 50px;
  font-size: 12px;
  height: auto;
}
</style>
