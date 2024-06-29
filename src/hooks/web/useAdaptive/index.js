import { getCurrentInstance, ref, nextTick, onMounted, watch } from 'vue'
import { unrefElement } from '@vueuse/core'
import { getViewportOffset, windowHeight, windowWidth } from '@/utils/domUtil'

export function useAdaptive(target, options) {
  const { adaptive = false, offsetBottom = 24 + 12 } = options || {}

  const vm = getCurrentInstance()

  const height = ref()

  const update = () => {
    const ele = unrefElement(target)
    const { bottomIncludeBody } = getViewportOffset(ele)
    // height.value = window.innerHeight - ele?.getBoundingClientRect().top - offsetBottom - 12
    height.value = bottomIncludeBody - offsetBottom - 24
    // 确保页面发送更新
    vm?.proxy?.$forceUpdate()
  }

  onMounted(() => {
    if (adaptive) {
      nextTick(update)
      for (let i = 1; i <= 3; i++) {
        setTimeout(update, 100 * i)
      }
    }
  })

  watch([windowWidth, windowHeight], update)

  return {
    height,
    setAdaptive: update
  }
}
