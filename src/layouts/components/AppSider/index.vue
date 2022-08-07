<template>
  <div
    class="basic-layout--aside"
    :class="{
      'basic-layout--aside-fixed': getIsMobile,
      'basic-layout--aside-collapse': getIsMobile && !getCollapsed
    }"
  >
    <div class="basic-layout--aside__content with-transition">
      <app-logo :collapsed="getCollapsed" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <app-menu
          :routes="permissionStore?.menus"
          @click="handleClose(false)"
        />
      </el-scrollbar>
    </div>
  </div>
  <teleport to="body">
    <el-overlay
      v-if="getIsMobile && !getCollapsed"
      @click="handleClose(true)"
    />
  </teleport>
</template>

<script>
import { defineComponent } from 'vue'

import { usePermissionStore } from '@/store'

import AppLogo from '../AppLogo/index.vue'
import AppMenu from '../AppMenu/index.vue'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppInjectStore } from '@/hooks/web/useAppProvideStore'

export default defineComponent({
  name: 'AppSider',
  components: { AppLogo, AppMenu },
  setup() {
    const permissionStore = usePermissionStore()

    const { getIsMobile } = useAppInjectStore()

    const {
      setMenuSetting,
      getCollapsed,
      getMenuBackgroundColor,
      getMenuWidth
    } = useMenuSetting()

    function handleClose(flag) {
      flag &&
        setMenuSetting({
          collapsed: true
        })
    }

    return {
      permissionStore,

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
.basic-layout--aside {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 100vh;

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: v-bind(getMenuBackgroundColor);

    &.with-logo {
      width: v-bind(getMenuWidth);
    }

    &.with-transition {
      transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
    }

    .el-menu {
      border-right: 0;

      &:not(.el-menu--collapse) {
        width: v-bind(getMenuWidth);
      }
    }
  }

  &-fixed {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    z-index: 2001;
  }

  &-fixed &__content {
    width: v-bind(getMenuWidth);
    transform: translateX(-100%);
  }

  &-collapse &__content {
    width: v-bind(getMenuWidth);
    transform: translateX(0);
  }
}
</style>
