<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive
      v-if="keepAlive"
      :exclude="getExcludeCachedTabs"
      :include="getCachedTabs"
    >
      <component
        v-if="renderRouteView"
        :is="Component"
        :key="route.fullPath"
      />
    </keep-alive>
    <component
      v-else-if="renderRouteView"
      :is="Component"
      :key="route.fullPath"
    />
  </router-view>
</template>

<script setup>
import { computed, unref } from 'vue'

import { storeToRefs } from '@/store'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

const tabStore = useMultipleTabStore()

const { getCachedTabs, getExcludeCachedTabs, renderRouteView } = storeToRefs(tabStore)

const { getOpenKeepAlive } = useRootSetting()
const { getShowMultipleTab } = useMultipleTabSetting()

const keepAlive = computed(
  () => unref(getOpenKeepAlive) && unref(getShowMultipleTab)
)
</script>
