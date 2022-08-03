<template>
  <el-drawer
    v-if="getIsMobile"
    :model-value="!getCollapsed"
    custom-class="basic-layout__drawer"
    direction="ltr"
    :size="getMenuWidth"
    :with-header="false"
    @close="handleClose"
  >
    <Sider />
  </el-drawer>
  <Sider v-else />
</template>

<script>
import { defineComponent, inject } from 'vue'
import Sider from './sider.vue'

import { APP_PROVIDER_KEY } from '@/components/AppProvider'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'AppSider',
  components: {
    Sider
  },
  setup() {
    const { getIsMobile } = inject(APP_PROVIDER_KEY, null)

    const {
      setMenuSetting,
      getCollapsed,
      getMenuBackgroundColor,
      getMenuWidth
    } = useMenuSetting()

    function handleClose() {
      setMenuSetting({
        collapsed: true
      })
    }

    console.log(getIsMobile)
    return {
      getIsMobile,
      getCollapsed,
      getMenuBackgroundColor,
      getMenuWidth,

      handleClose
    }
  }
})
</script>

<style lang="scss">
.basic-layout__drawer {
  .el-drawer__body {
    height: 100vh;
    padding: 0;
  }
}
</style>
