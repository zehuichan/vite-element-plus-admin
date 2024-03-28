<template>
  <div ref="wrapRef" class="vc-table">
    <el-table
      v-loading="loading"
      v-show="initialized"
      ref="tableRef"
      v-bind="$attrs"
      border
      stripe
      :max-height="height"
      @header-dragend="setHeaderDragend"
    >
      <slot />
      <el-table-column v-for="column in getViewColumns" v-bind="column">
        <template #default="scope">
          <slot v-if="$slots[column.prop]" :name="column.prop" v-bind="scope || {}" />
        </template>
      </el-table-column>
      <template #[item]="data" v-for="item in ['append', 'empty']">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </el-table>
    <pagination
      v-if="pagination"
      v-bind="getPaginationProps"
    />
  </div>
</template>

<script setup>
import { computed, ref, useAttrs, unref } from 'vue'

import { tryOnMounted } from '@vueuse/core'

import { omit } from 'lodash-es'

import { useAdaptive } from '@/hooks/web/useAdaptive'

import { useColumns } from './hooks/useColumns'

import { tableEmits, tableProps } from './Table'

const COMPONENT_NAME = 'VcTable'
defineOptions({
  name: 'VcTable',
  inheritAttrs: false,
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const attrs = useAttrs()

const wrapRef = ref(null)
const tableRef = ref(null)
const innerPropsRef = ref({})

const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) }
})
const getPaginationProps = computed(() => {
  return omit({ ...attrs, }, ['columns', 'data'])
})
const pagination = computed(() => {
  return unref(getProps).currentPage !== undefined || unref(getProps).pageSize !== undefined
})

const { initialized, getViewColumns, getHeaderDragend, setHeaderDragend } = useColumns(getProps)
const { height } = useAdaptive(tableRef, { adaptive: props.adaptive })

const setProps = (props) => {
  innerPropsRef.value = { ...unref(innerPropsRef), ...props }
}

const tableActions = {
  setProps,
  clearSelection: () => unref(tableRef).clearSelection(),
  getSelectionRows: () => unref(tableRef).getSelectionRows(),
  toggleRowSelection: (row, selected) => unref(tableRef).toggleRowSelection(row, selected),
  toggleAllSelection: () => unref(tableRef).toggleAllSelection(),
  toggleRowExpansion: (row, expanded) => unref(tableRef).toggleRowExpansion(row, expanded),
  setCurrentRow: (row) => unref(tableRef).setCurrentRow(row),
  clearSort: () => unref(tableRef).clearSort(),
  clearFilter: (columnKeys) => unref(tableRef).clearFilter(columnKeys),
  doLayout: () => unref(tableRef).doLayout(),
  sort: (prop, order) => unref(tableRef).sort(prop, order),
  scrollTo: (options) => unref(tableRef).scrollTo(options),
  setScrollTop: (top) => unref(tableRef).setScrollTop(top),
  setScrollLeft: (left) => unref(tableRef).setScrollLeft(left),
}

tryOnMounted(() => {
  getHeaderDragend()
  emit('register', tableActions)
})

defineExpose(tableActions)
</script>

<style lang="scss">

</style>
