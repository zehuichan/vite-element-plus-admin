import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VSvgIcon',
  props: {
    name: String,
    classPrefix: String,
  },
  setup(props, { slots }) {
    return () => (
      <svg class={[props.classPrefix, 'iconfont']} aria-hidden="true">
        <use xlinkHref={`#${props.name}`}/>
      </svg>
    )
  }
})