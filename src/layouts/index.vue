<template>
  <el-container class="basic-layout">
    <el-aside class="basic-layout__aside" width="200px">
      <div class="basic-layout__aside-content">
        <Logo/>
        <div style="flex: 1 1 0%; overflow: hidden auto;">
          <Menu/>
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
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'

import Logo from './components/Logo'
import Menu from './components/Menu'
import Trigger from './components/Trigger'
import Header from './components/Header'
import AppMain from './components/AppMain'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    Logo,
    Menu,
    Trigger,
    Header,
    AppMain
  },
  setup(props) {

    return {}
  }
})
</script>

<style lang="scss">
.basic-layout {
  width: 100%;
  min-height: 100%;
}

.basic-layout__aside {
  min-height: 100%;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);

  .basic-layout__aside-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>