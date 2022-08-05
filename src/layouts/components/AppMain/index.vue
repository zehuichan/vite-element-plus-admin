<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <keep-alive v-if="openCache" :include="getCaches">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component v-else :is="Component" :key="route.fullPath" />
    </router-view>
  </div>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import { useTabsViewStore } from '@/store'
import defaultSettings from '@/settings/projectSetting'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const tabsViewStore = useTabsViewStore()

    const openCache = computed(() => defaultSettings.openKeepAlive)
    const getCaches = computed(() => {
      if (!unref(openCache)) {
        return []
      }
      return tabsViewStore.getCachedTabList
    })

    return {
      openCache,
      getCaches
    }
  }
})
</script>
