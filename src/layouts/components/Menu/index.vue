<template>
  <el-menu
    mode="vertical"
    :defaultActive="defaultActive"
    :collapse="collapse"
    :backgroundColor="variables.backgroundColor"
    :textColor="variables.textColor"
    :activeTextColor="variables.activeTextColor"
    @select="onSelect"
  >
    <menu-item v-for="route in routes" :key="route.path" :item="route"/>
  </el-menu>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useExtractICSS } from '@/hooks'
import MenuItem from './item.vue'
import { isUrl } from '@/utils/validate'

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
    const { push, currentRoute } = useRouter()

    const activeMenu = computed(() => {
      const { meta, path } = unref(currentRoute)
      // if set path, the sidebar will highlight the path you set
      if (meta?.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    const onSelect = (index) => {
      if (isUrl(index)) {
        window.open(index)
      } else {
        push(index)
      }
    }

    return {
      variables: useExtractICSS(),
      defaultActive: activeMenu,
      onSelect
    }
  },
  components: {
    MenuItem
  }
})
</script>

<style>

</style>