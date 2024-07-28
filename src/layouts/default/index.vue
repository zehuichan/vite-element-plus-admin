<template>
  <section class="basic-layout layout-aside" :class="layoutClass">
    <app-sider />
    <section class="basic-layout-main">
      <app-header />
      <app-content />
      <app-footer v-if="getShowFooter" />
    </section>
  </section>
  <el-backtop v-if="getUseOpenBackTop" />
</template>

<script setup>
import { computed, unref } from 'vue'

import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

import AppHeader from './components/AppHeader/index.vue'
import AppContent from './components/AppContent/index.vue'
import AppSider from './components/AppSider/index.vue'
import AppFooter from './components/AppFooter/index.vue'

const { getIsMobile, getShowFooter, getUseOpenBackTop } = useRootSetting()
const {
  getCollapsed,
  getAnimation,
  getMenuBackgroundColor,
  getMenuWidth,
  getCollapsedWidth
} = useMenuSetting()

const layoutClass = computed(() => {
  const opened = unref(getCollapsed)

  return {
    mobile: unref(getIsMobile),
    hideSider: opened,
    openSider: !opened,
    withoutAnimation: unref(getAnimation),
  }
})
</script>

<style lang="scss">
.basic-layout {
  width: 100%;
  min-height: 100%;
  background-color: #f4f7f9;

  .basic-layout-main {
    position: relative;
    margin-left: v-bind(getMenuWidth);
    transition: margin-left 0.28s;
  }

  .basic-layout-aside {
    transition: width 0.28s;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2001;
    width: v-bind(getMenuWidth);
    height: 100vh;

    // reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
    }

    .operations {
      padding: 8px 0;
      color: #fff;
      text-align: center;
    }

    .basic-layout-aside-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: v-bind(getMenuBackgroundColor);

      .el-menu {
        --el-menu-item-font-size: 12px;
        border-right: 0;

        &:not(.el-menu--collapse) {
          width: v-bind(getMenuWidth);
        }

        .i-icon {
          flex-shrink: 0;
          vertical-align: middle;
          margin-right: 5px;
          width: var(--el-menu-icon-width);
          text-align: center;
          font-size: 14px;
        }
      }

      .el-sub-menu {
        .i-icon {
          vertical-align: middle;
          margin-right: 5px;
          width: var(--el-menu-icon-width);
          text-align: center;
          font-size: 14px;
        }
      }

      .el-menu--collapse > .el-menu-item [class^=i-icon],
      .el-menu--collapse > .el-sub-menu > .el-sub-menu__title [class^=i-icon],
      .el-menu--collapse > .el-menu-item-group > ul > .el-sub-menu > .el-sub-menu__title [class^=i-icon] {
        margin: 0;
        vertical-align: middle;
        width: var(--el-menu-icon-width);
        text-align: center;
        height: auto;
        visibility: visible;
      }

      .el-sub-menu__title .i-icon {
        color: inherit;
      }
    }

    .basic-layout-aside__collapsed {
      width: v-bind(getCollapsedWidth);
    }

    .basic-layout-aside__open {
      width: v-bind(getMenuWidth);
      transform: translateX(0);
    }

    .basic-layout-aside__hide {
      width: v-bind(getMenuWidth);
      transform: translateX(-100%);
    }
  }

  .basic-layout-multiple-header {

  }

  .basic-layout-multiple-header--fixed {
    position: fixed;
    top: 0;
    z-index: 505;
    width: calc(100% - v-bind(getMenuWidth));
    transition: width 0.28s;
  }

  &.hideSider {
    .basic-layout-aside {
      width: v-bind(getCollapsedWidth);
    }

    .basic-layout-main {
      margin-left: v-bind(getCollapsedWidth);
    }

    .basic-layout-multiple-header--fixed {
      width: calc(100% - v-bind(getCollapsedWidth));
    }
  }

  &.withoutAnimation {
    .basic-layout-aside,
    .basic-layout-main,
    .basic-layout-multiple-header--fixed {
      transition: none;
    }
  }

  &.mobile {
    .basic-layout-aside {
      transition: transform 0.28s;
      width: v-bind(getMenuWidth);
    }

    .basic-layout-aside__open {
      width: v-bind(getMenuWidth);
      transform: translateX(0);
    }

    .basic-layout-aside__hide {
      width: v-bind(getMenuWidth);
      transform: translateX(-100%);
    }

    .basic-layout-main {
      margin-left: 0;
    }

    .basic-layout-multiple-header--fixed {
      width: 100%;
    }

    &.hideSider {
      .basic-layout-aside {
        pointer-events: none;
        transition-duration: 0.3s;
      }
    }
  }
}
</style>
