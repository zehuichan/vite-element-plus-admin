<template>
  <drawer
    v-bind="$attrs"
    title="列设置"
    size="360"
    @confirm="handleActions('confirm')"
    @open="handleActions('open')"
  >
    <draggable
      v-model="columnOptions"
      animation="300"
      item-key="prop"
      @end="draggableEnd"
    >
      <template #item="{ element }">
        <div class="table-column-setting">
          <div class="table-column-setting__item">
            <icon-park class="table-column-drag-icon haptics-feedback" type="more-one" />
            <el-checkbox v-model="element.ifShow">
              {{ element.label }}
            </el-checkbox>
          </div>
          <div class="table-column-drag-index">
            <el-input v-model="element.width" placeholder="列宽">
              <template #append>PX</template>
            </el-input>
          </div>
        </div>
      </template>
    </draggable>
  </drawer>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'

import { useRoute } from 'vue-router'

import Draggable from 'vuedraggable'

import { cloneDeep } from 'lodash-unified'

import { localForage } from '@/utils/localforage'
import { TABLE_SETTING_KEY } from '@/enums/cacheEnum'

import { useTableContext } from '../hooks/useTableContext'

const props = defineProps(['cache'])
const emit = defineEmits(['columns-change'])

const route = useRoute()
const table = useTableContext()

// 是否已经从缓存恢复
let isRestored = false
let isInnerChange = false

const columnOptions = ref([])

const handleActions = (type) => {
  switch (type) {
    case 'confirm':
      saveColums()
      updateColums()
      break
    case 'open':
      break
  }
}

const saveColums = () => {
  if (props.cache) {
    const cacheKey = route.name + table.tableKey
    const options = cloneDeep(columnOptions.value)
    localForage.setItem(TABLE_SETTING_KEY, { [cacheKey]: options })
  }
}

const resetColums = async () => {
  const cacheMap = await localForage.getItem(TABLE_SETTING_KEY)
  delete cacheMap[route.name + table.tableKey]
  await localForage.setItem(TABLE_SETTING_KEY, cacheMap)
  updateColums()
}

const updateColums = () => {
  // 考虑了所有列
  const columns = cloneDeep(table?.getColumns())

  let count = 1

  // 按 columnOptions 的排序 调整 table.getColumns() 的顺序和值
  for (const opt of columnOptions.value) {
    const colIdx = columns.findIndex((o) => o.prop === opt.prop)
    //
    if (colIdx > -1) {
      const target = columns[colIdx]
      target.ifShow = opt.ifShow
      target.width = opt.width
      columns.splice(colIdx, 1)
      columns.splice(count++, 0, target) // 递增插入
    }
  }

  setColumns(columns)
}

const columnIfShow = (column) => {
  if (column) {
    if ('ifShow' in column) {
      if (typeof column.ifShow === 'boolean') {
        return column.ifShow
      } else if (column.ifShow) {
        return column.ifShow(column)
      }
    }
    return true
  }
  return false
}

const getColumns = () => {
  return table
    .getColumns({ ignoreIndex: true, ignoreAction: true })
    .filter((col) => columnIfShow(col))
}

const setColumns = (columns) => {
  isInnerChange = true
  table.setColumns(columns)
  emit('columns-change', columns)
}

// todo
const diff = async () => {
  const cacheMap = await localForage.getItem(TABLE_SETTING_KEY)
  const cache = cacheMap && cacheMap[route.name + table.tableKey]
  console.log('a', JSON.stringify(columnOptions.value))
  console.log('b', JSON.stringify(cache))
  if (cache) {
    if (JSON.stringify(columnOptions.value) !== JSON.stringify(cache)) {
    }
  }
}

const restore = async () => {
  const cacheMap = await localForage.getItem(TABLE_SETTING_KEY)
  const cache = cacheMap && cacheMap[route.name + table.tableKey]
  if (cache) {
    columnOptions.value = cache
  }
}

// 拖拽排序
const draggableEnd = () => {
  columnOptions.value = cloneDeep(columnOptions.value)
  updateColums()
  saveColums()
}

const init = async () => {
  if (!isRestored) {
    const columns = getColumns()

    // 沿用逻辑
    table.setCacheColumns(columns)

    // 生成 默认值
    const options = []

    for (const col of columns) {
      options.push({
        ...col,
        ifShow: col.ifShow || true,
        width: col.width || 100
      })
    }
    columnOptions.value = cloneDeep(options)

    props.cache && await diff()
    props.cache && await restore()

    updateColums()

    isRestored = true
  }
}

const once = () => {
  init()
}
once()

// 外部列改变
const columnsRef = computed(() => {
  return table?.getColumns()
})

onMounted(() => {
  watch(columnsRef, () => {
    if (!isInnerChange) {
      isRestored = false
      console.log('onMounted isRestored')
      columnOptions.value = columnsRef.value
      saveColums()
      updateColums()
    } else {
      isInnerChange = false
    }
  }, { deep: true })
})
</script>

<style lang="scss">
.table-column-setting {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-column-setting__item {
  display: flex;
  align-items: center;
}

.table-column-drag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: move;
}

.table-column-drag-index {

}
</style>
