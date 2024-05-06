<template>
  <el-autocomplete
    v-bind="$attrs"
    :fetch-suggestions="fetchSuggestions"
    :placeholder="placeholder"
    clearable
  />
</template>

<script setup>
import { onMounted, ref, unref } from 'vue'

import { get } from 'lodash-unified'

import { isFunction } from '@/utils/is'

defineOptions({
  name: 'ApiSuggestion',
  inheritAttrs: false
})
const emit = defineEmits(['unmatched'])
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
  placeholder: {
    type: String,
    default: '请填写'
  },
})

const cacheOptions = ref([])
const options = ref([])
const loading = ref(false)
const isFirstLoaded = ref(false)

const handleFetch = async (queryString = '') => {
  const { api, params } = props
  if (!api || !isFunction(api)) return []
  loading.value = true
  const res = await api({ ...params, ...(params?.key ? { [params?.key]: queryString } : null) })
  loading.value = false
  isFirstLoaded.value = true
  if (Array.isArray(res)) {
    options.value = res
  } else if (props.resultField) {
    options.value = get(res, props.resultField) || []
  }
  return options.value
}

const fetchSuggestions = async (queryString = '', cb) => {
  queryString = queryString === 'null' ? '' : queryString
  const results = queryString
    ? await handleFetch(queryString)
    : unref(cacheOptions)
  if (queryString && results.length === 0) {
    emit('unmatched')
  }
  cb(results)
}

const fetchAll = async () => {
  const { api, params } = props
  if (!api || !isFunction(api)) return
  loading.value = true
  const res = await api(params)
  loading.value = false
  isFirstLoaded.value = true
  if (Array.isArray(res)) {
    options.value = cacheOptions.value = res
  } else if (props.resultField) {
    options.value = cacheOptions.value = get(res, props.resultField) || []
  }
}

onMounted(fetchAll)
</script>

<style scoped lang="scss">

</style>
