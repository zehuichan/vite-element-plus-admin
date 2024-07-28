<template>
  <div class="app-provider">
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'

import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

useEventListener(window, 'resize', () => {
  if (appStore.getIsMobile) {
    appStore.setProjectConfig({
      menuSetting: {
        animation: true,
        hidden: true
      },
    })
  }
})

onMounted(() => {
  if (appStore.getIsMobile) {
    appStore.setProjectConfig({
      menuSetting: {
        collapsed: true,
        animation: false
      },
    })
  }
})
</script>

<style lang="scss">
.app-provider {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
}
</style>
