<template>
  <el-select-v2
    class="w-full"
    v-bind="$attrs"
    v-model="state"
    clearable
    :placeholder="$attrs.placeholder ?? '请选择'"
    :loading="loading"
    :options="getOptions"
    @change="handleChange"
    @visible-change="handleFetch"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}" />
    </template>
  </el-select-v2>
</template>

<script>
import { defineComponent, ref, computed, unref, watch, watchEffect } from 'vue'

import { useVModel } from '@vueuse/core'

import { get, omit } from 'lodash-es'

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
    toRaw: {
      type: Boolean,
      default: false
    },
  },
  emits: ['change', 'options-change', 'update:modelValue'],
  setup(props, { emit }) {
    const options = ref([])
    const loading = ref(false)
    const isFirstLoad = ref(true)

    const state = useVModel(props, 'modelValue', emit)

    const getOptions = computed(() => {
      const { labelField, valueField, numberToString } = props

      const data = unref(options).reduce((prev, next) => {
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

      return data.length > 0 ? data : props.options
    })

    watchEffect(() => {
      props.immediate && !props.alwaysLoad && fetch()
    })

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true }
    )

    async function fetch() {
      const api = props.api
      if (!api || !isFunction(api)) return
      options.value = []
      try {
        loading.value = true
        const res = await api(props.params)
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

    async function handleFetch(visible) {
      if (visible) {
        if (props.alwaysLoad) {
          await fetch()
        } else if (!props.immediate && unref(isFirstLoad)) {
          await fetch()
          isFirstLoad.value = false
        }
      }
    }

    function handleChange(val) {
      const { valueField, toRaw } = props
      const data = unref(options).find((item) => item[valueField] === val)
      emit('change', toRaw ? data : val)
    }

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    return {
      state,
      getOptions,
      loading,
      handleFetch,
      handleChange
    }
  }
})
</script>
