<template>
  <el-space :id="inputId" class="api-check-tag" wrap>
    <el-check-tag
      v-for="{label, value} in getOptions"
      :class="{[`el-check-tag--${inputSize}`]: true}"
      :checked="isChecked(value)"
      @change="handleChange(value)"
    >
      {{ label }}
    </el-check-tag>
    <el-icon
      v-if="validateState && validateIcon"
      class="el-input__icon el-input__validateIcon"
    >
      <component :is="validateIcon" />
    </el-icon>
  </el-space>
</template>

<script setup>
import { computed, ref, unref, watch } from 'vue'

import { useFormItem, useFormItemInputId, useFormSize } from 'element-plus'

import { get } from 'lodash-unified'

import { ValidateComponentsMap } from '@/install/framework/ValidateComponentsMap'

import { isArray, isFunction } from '@/utils/is'

defineOptions({
  name: 'ApiCheckTag',
  inheritAttrs: false,
})
const props = defineProps({
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
  api: {
    type: Function,
    default: null
  },
  // api params
  params: null,
  resultField: {
    type: String,
    default: ''
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  immediate: {
    type: Boolean,
    default: true
  },
  validateEvent: {
    type: Boolean,
    default: true,
  }
})
const emit = defineEmits(['change', 'options-change'])

const options = ref([])
const loading = ref(false)
const isFirstLoaded = ref(false)

const stateModelValue = defineModel('modelValue')

const { form: elForm, formItem: elFormItem } = useFormItem()
const { inputId } = useFormItemInputId(props, {
  formItemContext: elFormItem,
})
const inputSize = useFormSize()

const needStatusIcon = computed(() => elForm?.statusIcon ?? false)
const validateState = computed(() => elFormItem?.validateState || '')
const validateIcon = computed(
  () => validateState.value && ValidateComponentsMap[validateState.value]
)

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

const isChecked = (value) => {
  if (props.multiple) {
    return stateModelValue.value.includes(value)
  } else {
    return stateModelValue.value === value
  }
}

const handleFetch = async () => {
  const { api, params } = props
  if (!api || !isFunction(api)) return
  options.value = []
  try {
    loading.value = true
    const data = {
      ...params,
      ...(params?.key ? { [params?.key]: query } : null)
    }
    const res = await api(data)
    isFirstLoaded.value = true
    if (isArray(res)) {
      options.value = res
      emitChange()
      return
    }
    if (props.resultField) {
      options.value = get(res, props.resultField) || []
    }
    emitChange()
  } catch (error) {
    console.warn(error)
  } finally {
    loading.value = false
  }
}

const handleChange = (value) => {
  if (props.multiple) {
    const index = stateModelValue.value.indexOf(value)
    if (index === -1) {
      stateModelValue.value.push(value)
    } else {
      stateModelValue.value.splice(index, 1)
    }
  } else {
    if (value === stateModelValue.value) {
      stateModelValue.value = null
    } else {
      stateModelValue.value = value
    }
  }
  emit('change', value)
}

const emitChange = () => {
  emit('options-change', unref(getOptions))
}

watch(
  () => stateModelValue.value,
  () => {
    if (props.validateEvent) {
      elFormItem?.validate?.('change').catch(err => console.warn(err))
    }
  }
)
watch(
  () => props.params,
  () => {
    !unref(isFirstLoaded) && handleFetch()
  },
  { deep: true, immediate: props.immediate }
)
</script>

<style lang="scss">
.api-check-tag {
  .el-check-tag {
    font-weight: 400;
  }

  .el-input__icon {
    height: inherit;
    line-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all var(--el-transition-duration);
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
