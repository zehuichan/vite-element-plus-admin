<template>
  <div class="desc" :class="{'is-readonly': inputReadonly, 'is-disabled': inputDisabled}">
    <div class="desc__wrapper" :class="{'placeholder': !state}">
      {{ state ?? placeholder }}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'

import { useVModel } from '@vueuse/core'

import { useFormItem } from 'element-plus'

export default defineComponent({
  name: 'Desc',
  inheritAttrs: false,
  props: {
    modelValue: null,
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
  },
  setup(props, { emit }) {
    const { form } = useFormItem()

    const state = useVModel(props, 'modelValue', emit)

    const inputDisabled = computed(() => {
      return props.disabled || form?.disabled
    })

    const inputReadonly = computed(() => {
      return props.readonly || form?.readonly
    })

    return {
      state,
      inputDisabled,
      inputReadonly,
    }
  }
})
</script>

<style lang="scss">
.desc {
  position: relative;
  font-size: var(--el-font-size-base);
  display: inline-flex;
  width: 100%;
  line-height: 32px;
  box-sizing: border-box;
  vertical-align: middle;

  .desc__wrapper {
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    padding: 0 11px;
    border-radius: 4px;
    transition: var(--el-transition-box-shadow);
    transform: translate3d(0, 0, 0);
    box-shadow: 0 0 0 1px var(--el-border-color) inset;

    &.placeholder {
      color: var(--el-text-color-placeholder);
    }
  }

  &.is-readonly {
  }

  &.is-disabled {
    cursor: not-allowed;

    .desc__wrapper {
      background-color: var(--el-disabled-bg-color);
      box-shadow: 0 0 0 1px var(--el-disabled-border-color) inset;
      color: var(--el-disabled-text-color);
      -webkit-text-fill-color: var(--el-disabled-text-color);
      cursor: not-allowed;
    }
  }
}
</style>
