<script lang="jsx">
import { defineComponent, nextTick, ref, watch } from 'vue'
import { onKeyStroke } from '@vueuse/core'

function launchNormalFullscreen(targetElement, props) {
  targetElement.classList.add('fullcontent')
  document.getElementsByTagName('html')[0].classList.add('fullcontent__html')
  if (props.zIndex) {
    targetElement.setAttribute('style', `z-index: ${props.zIndex}`)
  }
}

function exitNormalFullscreen(targetElement) {
  targetElement.classList.remove('fullcontent')
  targetElement.style.zIndex = ''
  document.getElementsByTagName('html')[0].classList.remove('fullcontent__html')
}

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
        launchNormalFullscreen(slotElement.value, props)
      } else {
        exitNormalFullscreen(slotElement.value)
      }
    }

    function updateModelValue() {
      emit('update:modelValue', false)
    }

    onKeyStroke('Escape', updateModelValue)

    function renderIcon() {
      if (props.modelValue) {
        return (
          <div class="fullcontent__close" onClick={updateModelValue}>
            <icon name="Close" />
          </div>
        )
      }
      return null
    }

    return () => {
      return (
        <div ref={slotElement}>
          {renderIcon()}
          {slots.default()}
        </div>
      )
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

.fullcontent__close {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 3000;
  width: 30px;
  height: 30px;
  color: #00000073;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
}

.fullcontent__html {
  overflow: hidden;
}

:not(:root):fullscreen::backdrop {
  background: #ffffff;
}
</style>
