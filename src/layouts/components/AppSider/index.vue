<template>
  <el-overlay v-if="getIsMobile && !getCollapsed" @click="handleClose(true)" />
  <!--todo 待优化-->
  <div
    :class="{
      'basic-layout--aside': true,
      'basic-layout--aside-collapsed': !getIsMobile && getCollapsed,
      'basic-layout--aside-fixed': getIsMobile,
      'basic-layout--aside-open': getIsMobile && !getCollapsed,
      'basic-layout--aside-hide': getIsMobile && getCollapsed,
      'with-transition': getAnimation
    }"
  >
    <div class="basic-layout--aside__content">
      <app-logo :collapsed="!getIsMobile && getCollapsed" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <app-menu
          :routes="permissionStore?.menus"
          @click="handleClose(false)"
        />
      </el-scrollbar>
    </div>
  </div>
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
      getAnimation,
      getMenuBackgroundColor,
      getMenuWidth,
      getCollapsedWidth
    } = useMenuSetting()

    function handleClose(flag) {
      if (flag) {
        setMenuSetting({
          collapsed: true
        })
      }
    }

    return {
      permissionStore,

      getIsMobile,
      getCollapsed,
      getAnimation,
      getMenuBackgroundColor,
      getMenuWidth,
      getCollapsedWidth,

      handleClose
    }
  }
})
</script>

<style lang="scss">
.basic-layout--aside {
  position: sticky;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2001;
  width: v-bind(getMenuWidth);
  height: 100vh;

  &.with-transition {
    transition: all 0.28s;
  }

  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: v-bind(getMenuBackgroundColor);

    .el-menu {
      border-right: 0;

      &:not(.el-menu--collapse) {
        width: v-bind(getMenuWidth);
      }
    }
  }

  &-collapsed {
    width: v-bind(getCollapsedWidth);
  }

  &-fixed {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0;
    z-index: 2001;
  }

  &-open {
    width: v-bind(getMenuWidth);
    transform: translateX(0);
  }

  &-hide {
    width: v-bind(getMenuWidth);
    transform: translateX(-100%);
  }
}
</style>
