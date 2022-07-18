<template>
  <el-container class="basic-layout">
    <el-aside class="basic-layout__aside" width="208">
      <div class="basic-layout__aside-content">
        <Logo />
        <div style="flex: 1 1 0; overflow: hidden auto">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <Menu :routes="permissionStore.menus" :collapse="false" />
          </el-scrollbar>
        </div>
        <Trigger />
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
        <TagsView />
      </el-header>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
  <el-backtop />
</template>

<script setup>
import { usePermissionStore } from '@/store'
import { AppMain, Header, Logo, Menu, TagsView, Trigger } from './components'

// 获取权限模块
const permissionStore = usePermissionStore()
</script>

<style lang="scss">
@import './index.scss';
</style>
