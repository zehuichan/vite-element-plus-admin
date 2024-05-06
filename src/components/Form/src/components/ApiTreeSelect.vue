<template>
  <el-tree-select
    class="w-full"
    v-bind="$attrs"
    v-model="state"
    :loading="loading"
    :data="treeData"
    :placeholder="placeholder"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </el-tree-select>
</template>

<script>
import { defineComponent, ref, computed, unref, watch } from 'vue'

import { useVModel } from '@vueuse/core'

import { find, get } from 'lodash-unified'

import { isArray, isFunction } from '@/utils/is'

export default defineComponent({
  name: 'ApiTreeSelect',
  inheritAttrs: false,
  props: {
    modelValue: null,
    placeholder: {
      type: String,
      default: '请选择'
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
  },
  emits: ['change', 'options-change', 'update:modelValue'],
  setup(props, { emit }) {

    const treeData = ref([])
    const isFirstLoaded = ref(false)
    const loading = ref(false)

    const state = useVModel(props, 'modelValue', emit)

    watch(
      () => props.params,
      () => {
        !unref(isFirstLoaded) && fetch()
      },
      { deep: true },
    )

    watch(
      () => props.immediate,
      (v) => {
        v && !isFirstLoaded.value && fetch()
      },
    )

    async function fetch() {
      const { api } = props
      if (!api || !isFunction(api) || loading.value) return
      loading.value = true
      treeData.value = []
      let result
      try {
        result = await api(props.params)
      } catch (e) {
        console.error(e)
      }
      loading.value = false
      if (!result) return
      if (!isArray(result)) {
        result = get(result, props.resultField)
      }
      treeData.value = result || []
      isFirstLoaded.value = true
      emit('options-change', treeData.value)
    }

    function handleChange(...args) {
      emit('change', ...args)
    }

    function emitChange() {
      emit('options-change', unref(treeData))
    }

    return {
      treeData,
      loading,
      state,
      handleChange
    }
  }
})
</script>
