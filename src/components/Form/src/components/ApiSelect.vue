<template>
  <el-select-v2
    class="w-full"
    v-bind="$attrs"
    v-model="state"
    clearable
    :placeholder="$attrs?.placeholder ?? '请选择'"
    :loading="loading"
    :options="getOptions"
    @visible-change="handleFetch"
  >
    <template #default="{item}">
      <div @click="handleSelect(item)">{{ item.label }}</div>
    </template>
  </el-select-v2>
</template>

<script>
import { defineComponent, ref, computed, unref, watch } from 'vue'

import { useVModel } from '@vueuse/core'

import { get } from 'lodash-es'

import { isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ApiSelect',
  inheritAttrs: false,
  props: {
    modelValue: null,
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
    alwaysLoad: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    readonly: Boolean,
  },
  emits: ['select', 'options-change', 'update:modelValue'],
  setup(props, { emit }) {
    const options = ref([])
    const loading = ref(false)
    const isFirstLoaded = ref(false)

    const state = useVModel(props, 'modelValue', emit)

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

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoaded) && handleFetch()
      },
      { deep: true, immediate: props.immediate }
    )

    async function handleFetch(query) {
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
        if (Array.isArray(res)) {
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

    function handleSelect(val) {
      emit('select', val)
    }

    function handleClear() {
      state.value = null
      emit('select')
    }

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    return {
      state,
      loading,
      getOptions,
      handleFetch,
      handleSelect,
    }
  }
})
</script>
