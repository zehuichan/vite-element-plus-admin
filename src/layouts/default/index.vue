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

<script>
import { computed, defineComponent, onMounted, unref } from 'vue'
import AppHeader from './components/AppHeader/index.vue'
import AppContent from './components/AppContent/index.vue'
import AppSider from './components/AppSider/index.vue'
import AppFooter from './components/AppFooter/index.vue'

import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppInjectStore } from '@/hooks/web/useAppProvideStore'
import { useEventListener } from '@vueuse/core'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    AppFooter,
    AppHeader,
    AppContent,
    AppSider
  },
  setup() {
    const { getIsMobile } = useAppInjectStore()

    const { getShowFooter, getUseOpenBackTop } = useRootSetting()
    const {
      setMenuSetting,
      getCollapsed,
      getAnimation,
      getMenuBackgroundColor,
      getMenuWidth,
      getCollapsedWidth
    } = useMenuSetting()

    const layoutClass = computed(() => {
      const opened = unref(getCollapsed)

      return {
        hideSider: opened,
        openSider: !opened,
        withoutAnimation: unref(getAnimation),
        mobile: unref(getIsMobile)
      }
    })

    useEventListener(window, 'resize', () => {
      if (unref(getIsMobile)) {
        setMenuSetting({
          animation: true
        })
      }
    })

    onMounted(() => {
      if (unref(getIsMobile)) {
        setMenuSetting({
          collapsed: true,
          animation: false
        })
      }
    })

    return {
      getShowFooter,
      getUseOpenBackTop,
      getMenuBackgroundColor,
      getMenuWidth,
      getCollapsedWidth,
      layoutClass
    }
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

    &-content {
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

    &__collapsed {
      width: v-bind(getCollapsedWidth);
    }

    &__open {
      width: v-bind(getMenuWidth);
      transform: translateX(0);
    }

    &__hide {
      width: v-bind(getMenuWidth);
      transform: translateX(-100%);
    }
  }

  .basic-layout-multiple-header {
    &--fixed {
      position: fixed;
      top: 0;
      z-index: 505;
      width: calc(100% - v-bind(getMenuWidth));
      transition: width 0.28s;
    }
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

  &.mobile {
    .basic-layout-aside {
      transition: transform 0.28s;
      width: v-bind(getMenuWidth);
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

  &.withoutAnimation {
    .basic-layout-aside,
    .basic-layout-main,
    .basic-layout-multiple-header--fixed {
      transition: none;
    }
  }
}
</style>
