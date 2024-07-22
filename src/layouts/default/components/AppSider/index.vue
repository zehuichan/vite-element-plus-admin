<template>
  <el-overlay v-if="isMobile && !getCollapsed" @click="handleClose(true)">
  </el-overlay>
    <div
      :class="{
      'basic-layout-aside': true,
      'basic-layout-aside__open': isMobile && !getCollapsed,
      'basic-layout-aside__hide': isMobile && getCollapsed
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
        <div v-if="!getCollapsed" class="operations">
          version: v{{ version }}{{ isMobile }}
        </div>
      </div>
    </div>
</template>

<script setup>
import { ElOverlay } from 'element-plus'

import { usePermissionStore } from '@/store/modules/permission'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useAppInjectStore } from '@/hooks/web/useAppProvideStore'

import AppLogo from '../AppLogo/index.vue'
import AppMenu from '../AppMenu/index.vue'

const { version } = __APP_INFO__

const permissionStore = usePermissionStore()
const { isMobile } = useAppInjectStore()

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
