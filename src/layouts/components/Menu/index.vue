<template>
  <el-menu
    mode="vertical"
    :default-active="defaultActive"
    :collapse="collapse"
    :background-color="variables.backgroundColor"
    :text-color="variables.textColor"
    :active-text-color="variables.activeTextColor"
    @select="onSelect"
  >
    <template v-for="route in routes" :key="route.path">
      <menu-item :item="route" />
    </template>
  </el-menu>
</template>

<script setup>
import { computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import MenuItem from './item.vue'
import { isUrl } from '@/utils/is'
import defaultSettings from '@/settings/projectSetting'

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
  if (meta.currentActiveMenu) {
    return meta.currentActiveMenu
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
