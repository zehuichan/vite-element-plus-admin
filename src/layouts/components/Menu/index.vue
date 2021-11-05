<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :unique-opened="false"
      :collapse-transition="false"
      :background-color="variables.backgroundColor"
      :text-color="variables.textColor"
      :active-text-color="variables.activeTextColor"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
    {{ variables }}
  </el-scrollbar>
</template>

<script>
import { defineComponent } from 'vue'
import { useExtractICSS } from '@/hooks'
import variables from '@/assets/scss/variables.scss'

export default defineComponent({
  name: 'Menu',
  setup() {
    return {
      variables: useExtractICSS(variables)
    }
  },
})
</script>

<style>
</style>