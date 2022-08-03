<template>
  <el-aside class="basic-layout__aside" :width="getMenuWidth">
    <div class="basic-layout__aside-content">
      <AppLogo />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <AppMenu :routes="permissionStore?.menus" />
      </el-scrollbar>
    </div>
  </el-aside>
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
.basic-layout__aside {
  min-height: 100%;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);

  .basic-layout__aside-content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .el-menu {
      border: 0;
    }

    .el-menu:not(.el-menu--collapse) {
      width: v-bind(getMenuWidth);
    }

    .el-menu-item {
      &:hover {
        color: v-bind(getMenuActiveTextColor);
      }

      &.is-active {
        background-color: #2d8cf0;
      }
    }

    .scrollbar-wrapper {
      height: calc(100vh - 57px - 48px);
    }
  }
}
</style>
