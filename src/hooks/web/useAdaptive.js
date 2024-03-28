import { defineComponent, getCurrentInstance, h, reactive, ref, nextTick } from 'vue'
import { unrefElement, useEventListener } from '@vueuse/core'
import { debounce } from 'lodash-es'
import { getViewportOffset } from '@/utils/domUtil'
import { onMountedOrActivated } from '@/hooks/web/onMountedOrActivated'

export const UseAdaptive = defineComponent({
  name: 'UseAdaptive',
  props: ['options'],
  setup(props, { slots }) {
    const target = ref()
    const data = reactive(useAdaptive(target, { adaptive: true, ...props.options }))
    return () => {
      if (slots.default)
        return h('div', { ref: target }, slots.default(data))
    }
  },
})

export function useAdaptive(target, options) {
  const { adaptive = false, offsetBottom = 36, timeout = 60 } = options || {}

  const vm = getCurrentInstance()

  const height = ref()

  const update = () => {
    if (!adaptive) return
    const ele = unrefElement(target)
    const { bottomIncludeBody } = getViewportOffset(ele)
    height.value = bottomIncludeBody - offsetBottom
    // 确保页面发送更新
    vm?.proxy?.$forceUpdate()
  }

  const debounceUpdate = debounce(
    update,
    timeout
  )

  debounceUpdate()
  onMountedOrActivated(() => {
    nextTick(() => {
      debounceUpdate()
    })
  })
  useEventListener('resize', debounceUpdate, { passive: true })

  return {
    height
  }
}
