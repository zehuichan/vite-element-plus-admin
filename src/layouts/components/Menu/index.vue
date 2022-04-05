<template>
  <el-menu
    mode="vertical"
    :defaultActive="defaultActive"
    :collapse="collapse"
    :backgroundColor="variables.backgroundColor"
    :textColor="variables.textColor"
    :activeTextColor="variables.activeTextColor"
  >
    <menu-item v-for="route in routes" :key="route.path" :item="route"/>
  </el-menu>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useExtractICSS } from '@/hooks'
import MenuItem from './item.vue'

export default defineComponent({
  name: 'Menu',
  props: {
    routes: Array,
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    collapse: Boolean,
    collapseTransition: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const route = useRoute()
    return {
      defaultActive: route?.path,
      variables: useExtractICSS()
    }
  },
  components: {
    MenuItem
  }
})
</script>

<style>

</style>