<template>
  <el-autocomplete
    class="w-full"
    v-bind="$attrs"
    v-model="stateLabel"
    :fetch-suggestions="fetchSuggestions"
    :placeholder="placeholder"
    :value-key="labelField"
    clearable
    @select="handleSelect"
    @change="handleChange"
    @clear="handleClear"
  >
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </el-autocomplete>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { get } from 'lodash-unified'

import { isArray, isFunction } from '@/utils/is'

defineOptions({
  name: 'ApiSuggestion',
  inheritAttrs: false
})
const props = defineProps({
  label: null,
  value: null,
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

// todo 占位
const stateLabel = defineModel('label')
const stateValue = defineModel('value')

const options = ref([])

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
  stateLabel.value = ''
  stateValue.value = ''
}

const handleSelect = (val) => {
  stateValue.value = val[props.valueField]
}

const handleChange = (val) => {
  stateValue.value = val ? val : ''
}

onMounted(fetchSuggestions)
</script>
