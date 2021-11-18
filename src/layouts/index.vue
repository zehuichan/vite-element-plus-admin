<template>
  <el-container class="basic-layout">
    <el-aside class="basic-layout__aside" width="208">
      <div class="basic-layout__aside-content">
        <Logo/>
        <div style="flex: 1 1 0; overflow: hidden auto;">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <Menu :routes="routes"/>
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
import { useRouter } from 'vue-router'
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
    const router = useRouter()
    return {
      routes: router.options.routes
    }
  },
})
</script>

<style lang="scss">
@import "./index.scss";
</style>

