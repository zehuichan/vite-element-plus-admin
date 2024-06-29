import { defineComponent, h, reactive, ref } from 'vue'

import { useAdaptive } from './index.js'

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
