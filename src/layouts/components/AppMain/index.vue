<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="openCache" :include="getCaches">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
    <component v-else :is="Component" :key="route.fullPath" />
  </router-view>
</template>

<script setup>
import { computed, unref } from 'vue'
import { useTabsViewStore } from '@/store'
import defaultSettings from '@/settings/projectSetting'

const tabsViewStore = useTabsViewStore()

const openCache = computed(() => defaultSettings.openKeepAlive)
const getCaches = computed(() => {
  if (!unref(openCache)) {
    return []
  }
  return tabsViewStore.getCachedTabList
})
</script>
