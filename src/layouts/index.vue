<template>
  <el-container class="basic-layout">
    <el-aside width="200px">
      aside
    </el-aside>
    <el-container>
      <el-header>header</el-header>
      <el-main>main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasicLayout',
  setup(props, {}) {

    return {}
  }
})
</script>

<style lang="scss">
.basic-layout {

}
</style>