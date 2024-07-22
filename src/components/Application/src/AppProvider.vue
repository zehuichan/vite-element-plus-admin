<template>
  <div class="app-provider" :class="active">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useBreakpoints, useEventListener } from '@vueuse/core'

import { useAppStore } from '@/store/modules/app'

import { useAppProvideStore } from '@/hooks/web/useAppProvideStore'

const isMobile = ref(false)

const appStore = useAppStore()

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const active = breakpoints.active()

useEventListener(window, 'resize', () => {
  isMobile.value = active.value === 'mobile'
  if (isMobile.value) {
    appStore.setProjectConfig({
      menuSetting: {
        animation: true,
        hidden: true
      },
    })
  }
})

onMounted(() => {
  if (isMobile.value) {
    appStore.setProjectConfig({
      menuSetting: {
        collapsed: true,
        animation: false
      },
    })
  }
})

useAppProvideStore({ isMobile: isMobile.value })
</script>

<style lang="scss">
.app-provider {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
}
</style>
