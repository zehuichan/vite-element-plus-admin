<template>
  <el-autocomplete
    class="w-full"
    v-bind="$attrs"
    v-model="computedModel"
    :fetch-suggestions="fetchSuggestions"
    :placeholder="placeholder"
    :value-key="labelField"
    clearable
    @select="handleSelect"
    @clear="handleClear"
  >
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </el-autocomplete>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { get } from 'lodash-unified'

import { isArray, isFunction } from '@/utils/is'

defineOptions({
  name: 'ApiSuggestion',
  inheritAttrs: false
})
const props = defineProps({
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
  placeholder: {
    type: String,
    default: '请填写'
  },
  options: {
    type: Array,
    default: () => []
  },
})
const emit = defineEmits(['unmatched'])

const stateModelValue = defineModel('modelValue')
const stateLabel = defineModel('label')
const stateValue = defineModel('value')

const options = ref([])

const computedModel = computed({
  get: () => stateModelValue.value || stateLabel.value,
  set: (val) => {
    console.log(val)
    stateModelValue.value = val
    stateLabel.value = val
  }
})

const fetchSuggestions = async (queryString, cb) => {
  queryString = queryString === 'null' ? '' : queryString
  const { api, params } = props
  if (isFunction(api)) {
    const data = {
      ...params,
      ...(params?.key ? { [params?.key]: queryString } : null)
    }
    const res = await api(data)
    options.value = isArray(res) ? res : get(res, props.resultField) || []
  } else if (isArray(props.options) && queryString) {
    options.value = props.options.filter(option => option[props.labelField].toLowerCase().includes(queryString.toLowerCase()))
  } else {
    options.value = props.options
  }
  if (queryString && options.value.length === 0) emit('unmatched')
  cb && cb(options.value)
}

function handleClear() {
  stateModelValue.value = ''
  stateLabel.value = ''
  stateValue.value = ''
}

// 关联 value，ex: form.clientId
const handleSelect = (val) => {
  stateValue.value = val[props.valueField]
}

onMounted(fetchSuggestions)
</script>
