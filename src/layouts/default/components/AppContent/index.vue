<template>
  <div class="basic-layout-content">
    <full-content v-model="fullContent">
      <router-view v-slot="{ Component, route }">
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </router-view>
    </full-content>
  </div>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'

import FullContent from './fullcontent.vue'

import { useMultipleTabStore } from '@/store'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'

export default defineComponent({
  name: 'AppContent',
  components: {
    FullContent
  },
  setup() {
    const tabStore = useMultipleTabStore()

    const { setRootSetting, getOpenKeepAlive, getFullContent } =
      useRootSetting()
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
    const fullContent = computed({
      get() {
        return getFullContent.value
      },
      set(val) {
        setRootSetting({
          fullContent: val
        })
      }
    })

    return {
      openCache,
      getCaches,
      fullContent
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
