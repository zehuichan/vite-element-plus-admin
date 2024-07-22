<template>
  <el-tabs v-bind="$attrs" v-model="computedModel" class="api-tabs">
    <el-tab-pane
      v-for="item in getOptions"
      v-bind="item"
      :label="item.label"
      :name="item.value"
    />
  </el-tabs>
</template>

<script setup>
import { computed,  ref, unref, watch } from 'vue'

import { get } from 'lodash-unified'

import { isArray, isFunction } from '@/utils/is'

defineOptions({
  name: 'ApiTabs',
  inheritAttrs: false
})
const props = defineProps({
  numberToString: Boolean,
  api: {
    type: Function,
    default: null
  },
  // api params
  params: null,
  // support xxx.xxx.xx
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
  options: {
    type: Array,
    default: () => []
  },
})
const emit = defineEmits(['options-change'])

const options = ref([])
const loading = ref(false)
const isFirstLoaded = ref(true)

const stateModelValue = defineModel('modelValue')
const stateLabel = defineModel('label')
const stateValue = defineModel('value')

const computedModel = computed({
  get: () => stateModelValue.value || stateValue.value,
  set: (val) => {
    stateModelValue.value = val
    stateValue.value = val
  }
})
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


const handleFetch = async (query) => {
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

const emitChange = () => {
  emit('options-change', unref(getOptions))
}

watch(
  () => props.params,
  () => {
    !unref(isFirstLoaded) && handleFetch()
  },
  { deep: true, immediate: props.immediate }
)
</script>

<style lang="scss">
.api-tabs {
  --el-tabs-header-height: 32px;
  --el-font-size-base: 12px;

  .el-tabs__header {
    margin-bottom: 8px;
  }
}
</style>
