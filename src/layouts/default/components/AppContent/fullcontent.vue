<script lang="jsx">
import { defineComponent, nextTick, ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'

export default defineComponent({
  name: 'FullContent',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'normal'
    },
    zIndex: {
      type: Number,
      default: 3000
    }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const slotElement = ref()

    watch(
      () => props.modelValue,
      (newVal) => {
        handleNormalFullscreen(newVal)
      },
      { immediate: true }
    )

    async function handleNormalFullscreen(isOpen) {
      await nextTick()
      if (isOpen) {
        slotElement.value.classList.add('fullcontent')
        document
          .getElementsByTagName('html')[0]
          .classList.add('fullcontent__html')
        if (props.zIndex) {
          slotElement.value.setAttribute('style', `z-index: ${props.zIndex}`)
        }
      } else {
        slotElement.value.classList.remove('fullcontent')
        slotElement.value.style.zIndex = ''
        document
          .getElementsByTagName('html')[0]
          .classList.remove('fullcontent__html')
      }
    }

    onKeyStroke('Escape', () => {
      emit('update:modelValue', false)
    })

    return () => {
      return <div ref={slotElement}>{slots.default()}</div>
    }
  }
})
</script>

<style lang="scss">
.fullcontent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3000;
  overflow: auto;
  background-color: #ffffff;
}

.fullcontent__html {
  overflow: hidden;
}

:not(:root):fullscreen::backdrop {
  background: #ffffff;
}
</style>
