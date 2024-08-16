<template>
  <div ref="wrapRef" class="vc-table" v-loading="loading" element-loading-text="loading...">
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      border
      show-overflow-tooltip
      :row-key="rowKey"
      :max-height="height"
      :row-class-name="tableRowClassName"
      @cell-click="onCellClick"
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
import { computed, provide, reactive, onMounted, ref, useAttrs, unref, toRefs } from 'vue'

import { paginationProps } from 'element-plus'

import { onClickOutside, onKeyStroke, useStorage } from '@vueuse/core'

import { pick } from 'lodash-unified'

import { useAdaptive } from '@/hooks/web/useAdaptive'

import { addClass, getEventTargetNode, removeClass } from '@/utils/domUtil'

import { useColumns } from './hooks/useColumns'
import { createTableContext } from './hooks/useTableContext'

import { tableEmits, tableProps } from './Table'
import { tableContextKey } from './constants'

import TableSetting from './components/TableSetting.vue'

const COMPONENT_NAME = 'VcTable'
defineOptions({
  name: 'VcTable',
  inheritAttrs: false,
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)
const attrs = useAttrs()

const wrapRef = ref()
const tableRef = ref()
const innerPropsRef = ref({})
const show = ref(false)

const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) }
})
const getPaginationProps = computed(() => {
  return pick({ ...props, ...attrs, }, Object.keys(paginationProps))
})
const highlight = computed(() => {
  const selection = tableRef.value?.getSelectionRows() || []
  if (selection.length > 0) {
    return tableRef.value.getSelectionRows().map((item) => item.id)
  }
  return []
})

const histroy = useStorage(`histroy_${props.tableKey}`, null)
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

const onCellClick = (row, column, cell, event) => {
  if (props.selected) {
    removeClass(wrapRef.value.querySelector('.cell--selected'), 'cell--selected')
    addClass(cell, 'cell--selected')
  }
}

const onRowDblclick = (row, column, event) => {
  tableRef.value.toggleRowSelection(row)
}

const setHighlightRow = (row) => {
  histroy.value = row?.[props.rowKey] ?? null
}

const tableRowClassName = ({ row, rowIndex }) => {
  if (row.id && highlight.value.includes(row.id)) {
    return 'highlight-row'
  }
  if (row.id && histroy.value === row.id) {
    return 'histroy-row'
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
  setHighlightRow,
  // ElTable Exposes
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

const getTargetCell = (selectedCell, direction) => {
  const row = selectedCell.parentElement
  const cellIndex = Array.from(row.children).indexOf(selectedCell)
  const rowIndex = Array.from(row.parentElement.children).indexOf(row)

  switch (direction) {
    case 'ArrowUp':
      return rowIndex > 0 ? row.parentElement.children[rowIndex - 1].children[cellIndex] : null
    case 'ArrowDown':
      return rowIndex < row.parentElement.children.length - 1 ? row.parentElement.children[rowIndex + 1].children[cellIndex] : null
    case 'ArrowLeft':
      return cellIndex > 0 ? row.children[cellIndex - 1] : null
    case 'ArrowRight':
      return cellIndex < row.children.length - 1 ? row.children[cellIndex + 1] : null
    case 'Enter':
      if (cellIndex < row.children.length - 1) {
        return row.children[cellIndex + 1]
      } else if (rowIndex < row.parentElement.children.length - 1) {
        return row.parentElement.children[rowIndex + 1].children[0]
      }
      return null
    default:
      return null
  }
}

const navigate = (direction) => {
  const selectedCell = wrapRef.value.querySelector('.cell--selected')
  if (!selectedCell) return

  if (direction === 'Escape') {
    // todo
  }

  const targetCell = getTargetCell(selectedCell, direction)
  if (targetCell) {
    onCellClick(null, null, targetCell, null)
    const inputElem = targetCell.querySelector('input, textarea')
    if (isAvailableNode(inputElem)) {
      setTimeout(() => {
        inputElem.focus()
        inputElem.select()
      })
    }
  }
}

function isAvailableNode(node) {
  if (
    node.tagName === 'INPUT'
    && !node.disabled
    && !['submit', 'reset', 'file', 'hidden', 'checkbox', 'radio'].includes(node.type)
  ) {
    return true
  } else if (
    node.tagName === 'TEXTAREA'
    && !node.disabled
  ) {
    return true
  }
  return false
}

onClickOutside(wrapRef.value, event => {
  removeClass(wrapRef.value.querySelector('.cell--selected'), 'cell--selected')
})

onKeyStroke(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Escape'], (event) => {
  props.keyboard && navigate(event.key)
}, { target: wrapRef.value })

onMounted(() => {
  setHighlightRow(null)
})

provide(tableContextKey, reactive({
  ...toRefs(props),
  emit,
}))

defineExpose(tableActions)
</script>

<style lang="scss">
.vc-table {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .cell--selected {
    box-shadow: inset 0 0 0 2px var(--el-color-primary);
  }

  .highlight-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-7);
  }

  .histroy-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
}
</style>
