import { nextTick, onMounted, ref, watch } from 'vue'
import { useElementBounding, useWindowSize } from '@vueuse/core'

export function usePlaceholder(element, withSafeArea) {
  const height = ref()

  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const setHeight = () => {
    height.value = useElementBounding(element).height
  }

  watch([windowWidth, windowHeight], setHeight)

  onMounted(() => {
    nextTick(setHeight)

    if (withSafeArea) {
      for (let i = 1; i <= 3; i++) {
        setTimeout(setHeight, 100 * i)
      }
    }
  })

  return height
}