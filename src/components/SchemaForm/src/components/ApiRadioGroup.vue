<template>
  <el-radio-group v-bind="$attrs" v-model="state">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <el-radio-button
        v-if="button"
        :label="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </el-radio-button>
      <el-radio
        v-else
        :label="item.value"
        :border="border"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue'

import { useVModel } from '@vueuse/core'
import { get, omit } from 'lodash-es'
import { isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ApiRadioGroup',
  inheritAttrs: false,
  props: {
    modelValue: [Array, Object, String, Number],
    options: Array,
    numberToString: Boolean,
    button: Boolean,
    border: Boolean,
    api: {
      type: Function,
      default: null
    },
    // api params
    params: {
      type: Object,
      default: () => ({})
    },
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
    }
  },
  emits: ['options-change', 'update:modelValue'],
  setup(props, { emit }) {
    const options = ref([])
    const loading = ref(false)
    const isFirstLoad = ref(true)

    // Embedded in the form, just use the hook binding to perform form verification
    const state = useVModel(props, 'modelValue', emit)

    const getOptions = computed(() => {
      const {
        labelField,
        valueField,
        numberToString,
        options: defaultOptions
      } = props

      return (defaultOptions ?? unref(options)).reduce((prev, next) => {
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

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoad) && fetch()
      },
      { deep: true }
    )

    async function fetch() {
      const { api, options: defaultOptions = [] } = props
      if (defaultOptions.length || !api || !isFunction(api)) return
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

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    onMounted(() => {
      props.immediate && !props.alwaysLoad && fetch()
    })

    return {
      state,
      getOptions,
      loading
    }
  }
})
</script>
