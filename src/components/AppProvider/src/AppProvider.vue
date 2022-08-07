<script lang="jsx">
import { defineComponent, ref } from 'vue'
import { breakpointsAntDesign, useBreakpoints } from '@vueuse/core'

import { useAppProvideStore } from '@/hooks/web/useAppProvideStore'

export default defineComponent({
  name: 'AppProvider',
  setup(props, { slots }) {
    const isMobile = ref(false)

    const breakpoints = useBreakpoints(breakpointsAntDesign)
    isMobile.value = breakpoints.smaller('lg')

    // Inject variables into the global
    useAppProvideStore({ isMobile })

    return () => slots.default?.()
  }
})
</script>
