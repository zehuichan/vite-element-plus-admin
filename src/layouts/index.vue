<template>
  <el-container class="basic-layout">
    <el-aside width="200px">
      <Logo/>
      <Menu/>
      aside
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
import Header from './components/Header'
import AppMain from './components/AppMain'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    Logo,
    Menu,
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

}
</style>