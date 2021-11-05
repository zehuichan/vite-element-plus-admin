<template>
  <el-container class="basic-layout">
    <el-aside class="basic-layout__aside" :width="variables.width">
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
      <el-backtop/>
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

import { useExtractICSS } from '@/hooks'
import variables from '@/assets/scss/variables.scss'

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
    return {
      variables: useExtractICSS(variables)
    }
  },
})
</script>

<style lang="scss">
@import "./index.scss";
</style>