<template>
  <section class="basic-layout layout-aside">
    <app-sider />
    <section class="basic-layout-main">
      <app-header />
      <app-content />
    </section>
  </section>
  <el-backtop />
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader/index.vue'
import AppContent from './components/AppContent/index.vue'
import AppSider from './components/AppSider/index.vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    AppHeader,
    AppContent,
    AppSider
  }
})
</script>

<style lang="scss">
.basic-layout {
  background-color: #f4f7f9;

  &.layout-aside {
    display: flex;
  }

  &-main {
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: #f0f2f5;
  }
}
</style>
