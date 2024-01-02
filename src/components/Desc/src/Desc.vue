<template>
  <div class="desc" :class="{'is-readonly': readonly, 'is-disabled': inputDisabled, [`desc-${inputSize}`]: true}">
    <div class="desc__wrapper" :class="{'placeholder': !state}">
      <slot>
        {{ dictType ? getDictDataLabel(dictType, state) : state ?? placeholder }}
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { useVModel } from '@vueuse/core'

import { useFormDisabled, useFormSize } from 'element-plus'

import { getDictDataLabel } from '@/hooks/web/useDict'

export default defineComponent({
  name: 'VcDesc',
  inheritAttrs: false,
  props: {
    modelValue: null,
    dictType: String,
    size: String,
    placeholder: String,
    disabled: Boolean,
    readonly: Boolean,
  },
  setup(props, { emit }) {
    const state = useVModel(props, 'modelValue', emit)

    const inputSize = useFormSize()
    const inputDisabled = useFormDisabled()

    return {
      getDictDataLabel,
      state,
      inputSize,
      inputDisabled,
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
  height: 32px;
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

.desc-small {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
}
</style>
