<template>
  <div ref="wrapRef" class="vc-table">
    <el-table
      v-loading="loading"
      element-loading-text="loading..."
      ref="tableRef"
      v-bind="$attrs"
      border
      show-overflow-tooltip
      :max-height="height"
      :row-class-name="tableRowClassName"
      @row-dblclick="onRowDblclick"
      @header-contextmenu="headerContextmenu"
      @header-dragend="headerDragend"
      @contextmenu.prevent.stop
    >
      <slot />
      <el-table-column v-for="column in getViewColumns" v-bind="column">
        <template #header>
          <slot :name="`header-${[column.prop]}`" v-bind="column" />
        </template>
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
    >
      <template #default>
        <slot name="pagination" />
      </template>
    </pagination>
    <table-setting
      v-model="show"
      :cache="cache"
      @columns-change="onColumnsChange"
    />
  </div>
</template>

<script setup>
import { computed, useSlots, ref, useAttrs, unref } from 'vue'

import { omit } from 'lodash-unified'

import { useAdaptive } from '@/hooks/web/useAdaptive'

import { useColumns } from './hooks/useColumns'
import { createTableContext } from './hooks/useTableContext'

import { tableEmits, tableProps } from './Table'

import TableSetting from './components/TableSetting.vue'

const COMPONENT_NAME = 'VcTable'
defineOptions({
  name: 'VcTable',
  inheritAttrs: false,
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const slots = useSlots()
const attrs = useAttrs()

const wrapRef = ref(null)
const tableRef = ref()
const innerPropsRef = ref({})
const show = ref(false)

const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) }
})
const getPaginationProps = computed(() => {
  return omit({ ...attrs, }, ['columns', 'data', 'pagination', 'show-summary', 'summary-method'])
})

const highlight = computed(() => {
  const selection = tableRef.value?.getSelectionRows() || []
  if (selection.length > 0) {
    return tableRef.value.getSelectionRows().map((item) => item.id)
  }
  return []
})

const {
  getViewColumns,
  getColumns,
  setColumns,
  getCacheColumns,
  setCacheColumns,
  setColumnWidth
} = useColumns(getProps)
const { height, setAdaptive } = useAdaptive(wrapRef, { adaptive: props.adaptive, ...props.adaptiveConfig })

const setProps = (props) => {
  innerPropsRef.value = { ...unref(innerPropsRef), ...props }
}

const onRowDblclick = (row, column, event) => {
  tableRef.value.toggleRowSelection(row)
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (highlight.value.includes(row.id)) {
    return 'highlight-row'
  }
  if (row.auditStatusId == 2) {
    return 'audit-row'
  }
  if (row.isPacked == 1) {
    return 'command-row'
  }
  if (row.isPacked == 2) {
    return 'packed-row'
  }
  if (row.isLocked == 1) {
    return 'locked-row'
  }
  return ''
}

const onColumnsChange = (data) => {
  emit('columns-change', data)
}

const headerContextmenu = () => {
  props.cache && (show.value = true)
}

const headerDragend = (newWidth, oldWidth, column, event) => {
  setColumnWidth(newWidth, column)
}

const tableActions = {
  setProps,
  setAdaptive,
  getColumns,
  setColumns,
  getCacheColumns,
  setCacheColumns,
  setColumnWidth,
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

createTableContext({ ...tableActions, tableKey: props.tableKey, tableRef })

emit('register', tableActions)

defineExpose(tableActions)
</script>

<style lang="scss">

</style>
