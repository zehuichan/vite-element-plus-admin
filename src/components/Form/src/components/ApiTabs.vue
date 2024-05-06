<template>
  <el-tabs v-bind="$attrs" v-model="state" class="api-tabs">
    <el-tab-pane
      v-for="item in getOptions"
      v-bind="item"
      :label="item.label"
      :name="item.value"
    />
  </el-tabs>
</template>

<script>
import { computed, defineComponent, ref, unref, watch, watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'
import { isFunction } from '@/utils/is'
import { get } from 'lodash-unified'

export default defineComponent({
  name: 'ApiTabs',
  inheritAttrs: false,
  props: {
    modelValue: null,
    options: Array,
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
  },
  emits: ['options-change', 'update:modelValue'],
  setup(props, { emit }) {
    const options = ref([])
    const loading = ref(false)
    const isFirstLoad = ref(true)
    // Embedded in the form, just use the hook binding to perform form verification
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

    watchEffect(() => {
      props.immediate && fetch()
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

    function emitChange() {
      emit('options-change', unref(getOptions))
    }

    return {
      state,
      getOptions,
      loading
    }
  }
})
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
