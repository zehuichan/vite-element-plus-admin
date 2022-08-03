<script lang="jsx">
import { defineComponent, ref, watchEffect } from 'vue'
import { breakpointsAntDesign, useBreakpoints } from '@vueuse/core'

import { useAppStore } from '@/store'

export const APP_PROVIDER_KEY = Symbol('AppProvider')

export default defineComponent({
  name: 'AppProvider',
  setup(props, { slots }) {
    const isMobile = ref(false)

    const appStore = useAppStore()

    const breakpoints = useBreakpoints(breakpointsAntDesign)
    isMobile.value = breakpoints.smaller('lg')

    watchEffect(() => {
      appStore.setProjectConfig({
        menuSetting: {
          collapsed: isMobile.value
        }
      })
    })

    // Inject variables into the global
    createAppProviderContext({ prefixCls, isMobile })

    return () => slots.default?.()
  }
})
</script>
