<template>
  <li
    class="dropdown-item"
    :class="{ 'dropdown-item__disabled': disabled }"
    @click.self="handleItemClick"
  >
    <slot name="icon" v-if="icon" />
    <slot />
  </li>
</template>

<script setup>
import { onBeforeUnmount, getCurrentInstance, inject } from 'vue'

import { DROPDOWN_INJECTION_KEY } from './tokens'

const props = defineProps({
  command: [String, Number, Object],
  disabled: Boolean,
  icon: [String, Object, Function]
})

const dropdown = inject(DROPDOWN_INJECTION_KEY)

const vm = getCurrentInstance().proxy

dropdown.onOptionCreate(vm)

const handleItemClick = (e) => {
  if (props.disabled) {
    return
  }
  if (dropdown.hideOnClick) {
    dropdown.handleClick()
  }
  dropdown.commandHandler(props.command, vm, e)
}

onBeforeUnmount(() => {
  const key = vm.command
  dropdown.onOptionDestroy(key, vm)
})
</script>


<style lang="scss">
.dropdown-item {
  margin: 0;
  padding: 4px 16px;
  cursor: pointer;
  font-size: 12px;
  line-height: 22px;

  &:hover:not(.dropdown-item__disabled) {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }

  &__disabled {
    color: #ccc;
    cursor: not-allowed;

    &:hover {
      background: #fff;
    }
  }
}
</style>
