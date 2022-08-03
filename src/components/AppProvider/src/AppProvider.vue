<script lang="jsx">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { breakpointsAntDesign, useBreakpoints } from '@vueuse/core'

import { useAppStore } from '@/store'
import { createAppProviderContext } from './useAppContext'

export default defineComponent({
  name: 'AppProvider',
  setup(props, { slots }) {
    const isMobile = ref(false)

    const appStore = useAppStore()

    const breakpoints = useBreakpoints(breakpointsAntDesign)
    isMobile.value = breakpoints.smaller('lg')

    watch(
      () => isMobile,
      (n) => {
        console.log(n)
        appStore.setProjectConfig({
          menuSetting: {
            collapsed: isMobile.value
          }
        })
      }
    )

    // Inject variables into the global
    createAppProviderContext({ isMobile })

    return () => slots.default?.()
  }
})
</script>
