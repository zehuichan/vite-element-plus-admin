<template>
  <el-menu
    :defaultActive="defaultActive"
    mode="vertical"
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
import MenuLink from './link'

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
  setup(props, { slots }) {
    const route = useRoute()
    return {
      defaultActive: route?.path,
      variables: useExtractICSS()
    }
  },
  components: {
    MenuItem,
    MenuLink
  }
})
</script>

<style>

</style>