<template>
  <el-select
    class="w-full"
    v-bind="$attrs"
    v-model="state"
    :loading="loading"
    :placeholder="placeholder"
    @change="handleChange"
  >
    <el-option
      v-for="item in getOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    >
      <slot name="item" :item="item" />
    </el-option>
  </el-select>
</template>

<script>
import { defineComponent, ref, computed, unref, watch } from 'vue'

import { useVModel } from '@vueuse/core'

import { find, get } from 'lodash-unified'

import { isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ApiSelect',
  inheritAttrs: false,
  props: {
    modelValue: null,
    numberToString: Boolean,
    placeholder: {
      type: String,
      default: '请填写'
    },
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
  emits: ['change', 'options-change', 'update:modelValue'],
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

    function handleChange(val) {
      const data = find(unref(getOptions), option => option.value === val)
      emit('change', data)
    }

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    return {
      state,
      loading,
      getOptions,
      handleChange
    }
  }
})
</script>
