<template>
  <el-container class="basic-layout">
    <el-aside class="basic-layout__aside" width="208">
      <div class="basic-layout__aside-content">
        <Logo/>
        <div style="flex: 1 1 0; overflow: hidden auto;">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <Menu :routes="permissionStore.menu" :collapse="false"/>
          </el-scrollbar>
        </div>
        <Trigger/>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <AppMain/>
      </el-main>
      <el-backtop/>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'
import { Logo, Menu, Trigger, Header, AppMain } from './components'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    Logo,
    Menu,
    Trigger,
    Header,
    AppMain
  },
  setup() {
    const permissionStore = usePermissionStore()  // 获取权限模块
    return {
      permissionStore
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>

