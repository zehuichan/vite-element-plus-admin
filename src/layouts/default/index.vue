<template>
  <section class="basic-layout layout-aside">
    <app-sider />
    <section class="basic-layout-main">
      <app-header />
      <app-content />
      <app-footer v-if="getShowFooter" />
    </section>
  </section>
  <el-backtop v-if="getUseOpenBackTop" />
</template>

<script>
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader/index.vue'
import AppContent from './components/AppContent/index.vue'
import AppSider from './components/AppSider/index.vue'
import AppFooter from './components/AppFooter/index.vue'

import { useRootSetting } from '@/hooks/setting/useRootSetting'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    AppFooter,
    AppHeader,
    AppContent,
    AppSider
  },
  setup() {
    const { getShowFooter, getUseOpenBackTop } = useRootSetting()

    return {
      getShowFooter,
      getUseOpenBackTop
    }
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
