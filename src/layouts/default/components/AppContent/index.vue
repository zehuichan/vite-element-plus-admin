<template>
  <div class="basic-layout-content">
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
import { useMultipleTabStore } from '@/store'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'

export default defineComponent({
  name: 'AppContent',
  setup() {
    const tabStore = useMultipleTabStore()

    const { getOpenKeepAlive } = useRootSetting()
    const { getShowMultipleTab } = useMultipleTabSetting()

    const openCache = computed(
      () => unref(getOpenKeepAlive) && unref(getShowMultipleTab)
    )
    const getCaches = computed(() => {
      if (!unref(getOpenKeepAlive)) {
        return []
      }
      return tabStore.getCachedTabList
    })

    return {
      openCache,
      getCaches
    }
  }
})
</script>

<style lang="scss">
.basic-layout-content {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
}
</style>
