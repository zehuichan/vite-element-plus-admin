<template>
  <teleport :to="teleport">
    <div
      ref="wrapRef"
      v-if="state"
      class="dropdown"
      :style="getStyle"
      @contextmenu.prevent.stop
    >
      <slot />
    </div>
  </teleport>
</template>

<script setup>
import { computed, provide, ref, reactive } from 'vue'
import { onClickOutside, useVModel } from '@vueuse/core'
import { DROPDOWN_INJECTION_KEY } from './tokens'

const props = defineProps({
  teleport: {
    type: String,
    default: 'body'
  },
  show: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 196
  },
  customEvent: {
    type: Object,
    default: null
  },
  axis: {
    type: Object,
    default() {
      return { x: 0, y: 0 }
    },
  },
  hideOnClick: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:show', 'command'])

const wrapRef = ref()

const states = reactive({
  items: new Map()
})

const state = useVModel(props, 'show', emit)

onClickOutside(wrapRef, event => state.value = false)

const getStyle = computed(() => {
  const { axis, styles, width } = props
  const { x, y } = axis || { x: 0, y: 0 }
  const menuHeight = states.items.size * 30
  const menuWidth = width
  const body = document.body

  const left = body.clientWidth < x + menuWidth ? x - menuWidth : x
  const top = body.clientHeight < y + menuHeight ? y - menuHeight : y

  return {
    position: 'absolute',
    width: `${width}px`,
    left: `${left + 1}px`,
    top: `${top + 1}px`,
    zIndex: 9999,
    ...styles, // Not the first, fix options.styles.width not working
  }
})

const onOptionCreate = (vm) => {
  states.items.set(vm.command, vm)
}

const onOptionDestroy = (key, vm) => {
  if (states.items.get(key) === vm) {
    states.items.delete(key)
  }
}

const handleClick = () => {
  state.value = false
}

const commandHandler = (...args) => {
  emit('command', ...args)
}

provide(DROPDOWN_INJECTION_KEY, reactive({
  hideOnClick: props.hideOnClick,
  onOptionCreate,
  onOptionDestroy,
  handleClick,
  commandHandler,
}))
</script>

<style lang="scss">
.dropdown {
  margin: 0;
  background: #fff;
  z-index: 100;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  background: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  box-shadow: var(--el-box-shadow-light);
}
</style>
