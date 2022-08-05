<template>
  <div class="basic-layout--aside__content with-transition">
    <!--    <app-logo v-if="!getCollapsed" />-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <app-menu :routes="permissionStore?.menus" />
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { usePermissionStore } from '@/store'

import AppLogo from '../AppLogo/index.vue'
import AppMenu from '../AppMenu/index.vue'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'Sider',
  components: { AppLogo, AppMenu },
  setup() {
    const permissionStore = usePermissionStore()
    const {
      getCollapsed,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,
      getMenuWidth
    } = useMenuSetting()

    return {
      permissionStore,

      getCollapsed,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,
      getMenuWidth
    }
  }
})
</script>

<style lang="scss">
.basic-layout--aside__content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .el-menu {
    border-right: 0;

    &:not(.el-menu--collapse) {
      width: v-bind(getMenuWidth);
    }
  }

  .scrollbar-wrapper {
    height: calc(100vh - 57px - 48px);
  }
}
</style>
