import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'MenuLink',
  setup(props, { slots }) {
    return () => h('router-link', props, slots)
  }
})