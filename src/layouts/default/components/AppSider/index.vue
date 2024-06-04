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
      <app-logo v-if="getShowLogo" :collapse="getCollapsed" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <app-menu
          :collapse="getCollapsed"
          :routes="permissionStore?.menus"
          @click="handleClose(false)"
        />
      </el-scrollbar>
      <div v-if="!getCollapsed" class="operations">
        version: v{{ version }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePermissionStore } from '@/store/modules/permission'

import { ElOverlay } from 'element-plus'
import AppLogo from '../AppLogo/index.vue'
import AppMenu from '../AppMenu/index.vue'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppInjectStore } from '@/hooks/web/useAppProvideStore'
import { useRootSetting } from '@/hooks/setting/useRootSetting'


const { version } = __APP_INFO__

const globAppTitle = import.meta.env.VITE_GLOB_APP_TITLE
const globAppFooter = import.meta.env.VITE_GLOB_APP_FOOTER
const globAppICP = import.meta.env.VITE_GLOB_APP_ICP

const permissionStore = usePermissionStore()

const { getIsMobile, getIsLaptop } = useAppInjectStore()

const { getShowLogo } = useRootSetting()
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
