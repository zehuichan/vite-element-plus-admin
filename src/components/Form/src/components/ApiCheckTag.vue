<template>
  <el-space class="api-check-tag" wrap>
    <el-check-tag
      v-for="{label, value} in getOptions"
      :class="{[`el-check-tag--${inputSize}`]: true}"
      :checked="isChecked(value)"
      @change="handleChange(value)"
    >
      {{ label }}
    </el-check-tag>
  </el-space>
</template>

<script>
import { computed, defineComponent, ref, unref } from 'vue'
import { useVModel } from '@vueuse/core'
import { useFormSize } from 'element-plus'

export default defineComponent({
  name: 'ApiCheckTag',
  props: {
    modelValue: [String, Number, Array],
    options: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      values: ['', 'default', 'small', 'large'],
    },
    multiple: Boolean,
    numberToString: Boolean,
    labelField: {
      type: String,
      default: 'label'
    },
    valueField: {
      type: String,
      default: 'value'
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const options = ref([])

    // Initialize state.value based on props.multiple
    const state = useVModel(props, 'modelValue', emit, { defaultValue: props.multiple ? [] : '' })

    const inputSize = useFormSize()

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props

      const data = unref(options).reduce((prev, next) => {
        if (next) {
          const value = next[valueField]
          prev.push({
            ...next,
            label: next[labelField],
            value: numberToString ? `${value}` : value
          })
        }
        return prev
      }, [])

      return data.length > 0 ? data : props.options
    })

    function isChecked(value) {
      if (props.multiple) {
        return state.value.includes(value)
      } else {
        return state.value === value
      }
    }

    function handleChange(value) {
      if (props.multiple) {
        const index = state.value.indexOf(value)
        if (index === -1) {
          state.value.push(value)
        } else {
          state.value.splice(index, 1)
        }
      } else {
        if (value === state.value) {
          state.value = null
        } else {
          state.value = value
        }
      }
      emit('change', value)
    }

    return {
      state,
      inputSize,
      getOptions,
      isChecked,
      handleChange
    }
  }
})
</script>

<style lang="scss">
.api-check-tag {
  .el-check-tag {
    font-weight: 400;
  }
}

.el-check-tag {
  height: 24px;
  line-height: 24px;
  padding: 0 9px;
  font-size: 12px;
}

.el-check-tag--large {
  padding: 0 11px;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
}

.el-check-tag--small {
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
}
</style>
