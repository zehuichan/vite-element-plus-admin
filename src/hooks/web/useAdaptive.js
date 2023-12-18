import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { tryOnMounted, unrefElement, useEventListener, useWindowSize } from '@vueuse/core'

export const UseAdaptive = defineComponent({
  name: 'UseAdaptive',
  props: ['options'],
  setup(props, { slots }) {
    const target = ref()
    const data = reactive(useAdaptive(target, props.options))
    return () => {
      if (slots.default)
        return h('div', { ref: target }, slots.default(data))
    }
  },
})

export function useAdaptive(target, options) {
  const height = ref(0)

  const update = async () => {
    await nextTick()
    const ele = unrefElement(target)
    const { height: windowHeight } = useWindowSize()
    const offsetBottom = options?.offsetBottom ?? 0
    height.value = `${
      windowHeight.value -
      ele.getBoundingClientRect().top -
      offsetBottom
    }`
  }

  update()
  tryOnMounted(update)
  useEventListener('resize', update, { passive: true })

  return {
    height
  }
}
