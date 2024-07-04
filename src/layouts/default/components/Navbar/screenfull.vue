<template>
  <div class="basic-layout-navbar-action__item" @click="toggle">
    <icon-park type="full-screen" v-if="!isFullscreen" />
    <icon-park type="off-screen" v-else />
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
