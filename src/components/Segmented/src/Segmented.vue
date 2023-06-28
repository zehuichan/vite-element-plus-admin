<template>
  <div class="segmented" :class="{'segmented-block': block}">
    <div class="segmented-group">
      <div
        v-for="(item, index) in getOptions"
        class="segmented-item"
        :class="{
        'segmented-item-selected': state === item.value,
        'segmented-item-disabled': inputDisabled || item.disabled,
        'segmented-item-readonly': inputReadonly,
      }"
        @click="handleClick(item, index)"
      >
        <div class="segmented-item-label">
          <slot v-bind="{...item, index, checked: state === item.value}">{{ item.label }}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'
import { useVModel } from '@vueuse/core'
import { omit } from 'lodash-es'
import { formContextKey } from 'element-plus'

export default defineComponent({
  name: 'Segmented',
  props: {
    modelValue: [String, Number],
    columns: Array,
    numberToString: Boolean,
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'value'
    },
    block: Boolean,
    disabled: Boolean,
    readonly: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const elForm = inject(formContextKey, {})

    const state = useVModel(props, 'modelValue', emit)

    const getOptions = computed(() => {
      const {
        labelField,
        valueField,
        numberToString,
        columns: defaultColumns
      } = props

      return defaultColumns.reduce((prev, next) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...omit(next, [labelField, valueField]),
            label: next[labelField],
            value: numberToString ? `${value}` : value
          })
        }
        return prev
      }, [])
    })

    const inputDisabled = computed(() => {
      return getProp('disabled')
    })

    const inputReadonly = computed(() => {
      return getProp('readonly')
    })

    function getProp(key) {
      return props[key] || (elForm?.props || {})[key]
    }

    function handleClick(item, index) {
      if (getProp('disabled') || getProp('readonly') || item.disabled) return
      state.value = item.value
      emit('change', item.value, index)
    }

    return {
      state,
      getOptions,
      inputDisabled,
      inputReadonly,
      handleClick
    }
  }
})
</script>

<style lang="scss">
:root {
  --segmented-bg: rgba(0, 0, 0, 0.04);
  --segmented-hover-bg: rgba(0, 0, 0, 0.06);
  --segmented-selected-bg: #fff;
  --segmented-label-color: rgba(0, 0, 0, 0.65);
  --segmented-label-hover-color: #262626;
  --segmented-disabled-color: rgba(0, 0, 0, 0.25);
}

.segmented {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5714285714285714;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
  color: rgba(0, 0, 0, 0.65);
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: var(--el-border-radius-base);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.04);

  &-group {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-items: flex-start;
    width: 100%;
  }

  // block styles
  &-block {
    display: flex;
  }

  &-block &-item {
    flex: 1;
    min-width: 0;
  }

  &-item {
    position: relative;
    text-align: center;
    cursor: pointer;
    transition: color .2s cubic-bezier(.645, .045, .355, 1);
    border-radius: var(--el-border-radius-base);

    &-selected {
      background-color: var(--segmented-selected-bg);
      box-shadow: 0 2px 8px -2px fade(#000, 5%), 0 1px 4px -1px fade(#000, 7%), 0 0 1px fade(#000, 8%);
      color: var(--segmented-label-hover-color);
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      inset-inline-start: 0;
      border-radius: inherit;
      transition: background-color .2s;
      // This is mandatory to make it not clickable or hoverable
      // Ref: https://github.com/ant-design/ant-design/issues/40888
      pointer-events: none;
    }

    &:hover:not(&-selected):not(&-disabled) {
      color: var(--segmented-label-hover-color);

      &::after {
        background-color: var(--segmented-hover-bg);
      }
    }

    &:active:not(&-selected):not(&-disabled) {
      color: var(--segmented-label-hover-color);

      &::after {
        background-color: var(--segmented-hover-bg);
      }
    }

    &-label {
      min-height: 32px;
      line-height: 32px;
      padding: 0 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &-disabled &-item,
  &-item-disabled {
    &,
    &:hover,
    &:focus {
      color: var(--segmented-disabled-color);
      cursor: not-allowed;
    }
  }
}
</style>
