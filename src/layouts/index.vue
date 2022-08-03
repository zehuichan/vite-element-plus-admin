<template>
  <el-container class="basic-layout">
    <app-sider />
    <el-container direction="vertical">
      <app-header />
      <app-main />
    </el-container>
  </el-container>
  <el-backtop />
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader/index.vue'
import AppMain from './components/AppMain/index.vue'
import AppSider from './components/AppSider/index.vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    AppHeader,
    AppMain,
    AppSider
  }
})
</script>

<style lang="scss">
.basic-layout {
  width: 100%;
  min-height: 100%;
}
</style>
