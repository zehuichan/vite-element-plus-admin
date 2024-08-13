<template>
  <el-overlay v-if="getIsMobile && !getCollapsed" @click="handleClose(true)" />
  <div
    :class="{
      'basic-layout-aside': true,
      'basic-layout-aside__collapsed': !getIsMobile && getCollapsed,
      'basic-layout-aside__fixed': getIsMobile,
      'basic-layout-aside__open': getIsMobile && !getCollapsed,
      'basic-layout-aside__hide': getIsMobile && getCollapsed
    }"
  >
    <div class="basic-layout-aside-content">
      <app-logo v-if="getShowLogo" :collapse="getCollapsed" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <app-menu
          :collapse="getCollapsed"
          :routes="permissionStore.getBackMenuList"
          @click="handleClose(false)"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ElOverlay } from 'element-plus'

import { usePermissionStore } from '@/store/modules/permission'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

import AppLogo from '../AppLogo/index.vue'
import AppMenu from '../AppMenu/index.vue'

const permissionStore = usePermissionStore()

const { getIsMobile, getShowLogo } = useRootSetting()
const { setMenuSetting, getCollapsed } = useMenuSetting()

function handleClose(flag) {
  if (flag) {
    setMenuSetting({
      collapsed: true,
      animation: false
    })
  }
}
</script>
