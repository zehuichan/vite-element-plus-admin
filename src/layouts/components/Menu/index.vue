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
    <menu-item v-for="route in routes" :key="route.path" :item="route" />
  </el-menu>
</template>

<script setup>
import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from './item.vue'
import { isUrl } from '@/utils/validate'
import defaultSettings from '@/settings'

defineProps({
  routes: Array,
  defaultOpeneds: Array,
  uniqueOpened: Boolean,
  collapse: Boolean,
  collapseTransition: {
    type: Boolean,
    default: true
  }
})

const { push, currentRoute } = useRouter()

const defaultActive = computed(() => {
  const { meta, path } = unref(currentRoute)
  // if set path, the sidebar will highlight the path you set
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const variables = computed(() => defaultSettings.sidebar)

const onSelect = (index) => {
  if (isUrl(index)) {
    window.open(index)
  } else {
    push(index)
  }
}
</script>
