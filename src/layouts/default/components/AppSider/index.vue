<template>
  <el-overlay v-if="getIsMobile && !getCollapsed" @click="handleClose(true)" />
  <div
    :class="{
      'basic-layout-aside': true,
      'basic-layout-aside__open': getIsMobile && !getCollapsed,
      'basic-layout-aside__hide': getIsMobile && getCollapsed
    }"
  >
    <div class="basic-layout-aside-content">
      <app-logo :collapse="collapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <app-menu
          :collapse="collapse"
          :routes="permissionStore?.menus"
          @click="handleClose(false)"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'

import { usePermissionStore } from '@/store'

import { ElOverlay } from 'element-plus'
import AppLogo from '../AppLogo/index.vue'
import AppMenu from '../AppMenu/index.vue'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppInjectStore } from '@/hooks/web/useAppProvideStore'

export default defineComponent({
  name: 'AppSider',
  components: { ElOverlay, AppLogo, AppMenu },
  setup() {
    const permissionStore = usePermissionStore()

    const { getIsMobile, getIsLaptop } = useAppInjectStore()

    const { setMenuSetting, getCollapsed } = useMenuSetting()

    const collapse = computed(() => {
      if (unref(getIsLaptop)) {
        return true
      }
      if (unref(getIsMobile)) {
        return false
      }
      return unref(getCollapsed)
    })

    function handleClose(flag) {
      if (flag) {
        setMenuSetting({
          collapsed: true,
          animation: false
        })
      }
    }

    return {
      permissionStore,
      collapse,
      getIsMobile,
      getIsLaptop,
      getCollapsed,

      handleClose
    }
  }
})
</script>
