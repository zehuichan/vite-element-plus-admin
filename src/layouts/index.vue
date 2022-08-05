<template>
  <section class="basic-layout layout-aside">
    <app-sider />
    <section class="basic-layout--container">
      <app-header />
      <app-main />
    </section>
  </section>
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
  &.layout-aside {
    display: flex;
  }

  &--container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
