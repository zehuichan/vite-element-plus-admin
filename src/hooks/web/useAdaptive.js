import { defineComponent, h, nextTick, reactive, ref, onMounted } from 'vue'
import { tryOnMounted, unrefElement, useEventListener } from '@vueuse/core'
import { debounce } from 'lodash-es'

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

  const update = () => {
    const ele = unrefElement(target)
    const offsetBottom = options?.offsetBottom || 38
    height.value = window.innerHeight - ele?.getBoundingClientRect().top - offsetBottom
  }

  update()
  tryOnMounted(update)
  useEventListener('resize', update, { passive: true })

  return {
    height
  }
}
