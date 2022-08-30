<template>
  <div class="basic-layout-navbar-action__item" @click="toggle">
    <icon name="FullScreen" v-if="!isFullscreen" />
    <icon name="Close" v-else />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
  name: 'Screenfull',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()

    return {
      isFullscreen,
      toggle
    }
  }
})
</script>
