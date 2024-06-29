import { computed, ref, toRaw, unref, watch } from 'vue'

import { cloneDeep, isEqual } from 'lodash-unified'

import { usePermission } from '@/hooks/web/usePermission'

import { isArray, isBoolean, isFunction, isString } from '@/utils/is'

export function useColumns(propsRef, ctx) {
  const columnsRef = ref(unref(propsRef).columns)
  let cacheColumns = unref(propsRef).columns

  const getViewColumns = computed(() => {
    return unref(columnsRef).filter((column) => hasPermission(column.auth) && isIfShow(column))
  })

  const { hasPermission } = usePermission()

  function isIfShow(column) {
    const ifShow = column.ifShow

    let isIfShow = true

    if (isBoolean(ifShow)) {
      isIfShow = ifShow
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(column)
    }
    return isIfShow
  }

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns
      cacheColumns = columns
    }
  )

  function getColumns(options = {}) {
    const { ignoreIndex, ignoreAction, sort } = options || {}
    // columns = columns.filter((vnode) => vnode.props.type !== SELECTION_COLUMN_FLAG)
    // columns = columns.filter((vnode) => vnode.props.type !== INDEX_COLUMN_FLAG)
    return columnsRef.value
  }

  function setColumns(columnList) {
    const columns = cloneDeep(columnList)
    if (!isArray(columns)) return

    if (!columns.length) {
      columnsRef.value = []
      return
    }

    const firstColumn = columns[0]

    const cacheKeys = cacheColumns.map((item) => item.prop)

    // 针对拖拽排序
    if (!isString(firstColumn) && !isArray(firstColumn)) {
      columnsRef.value = columns
    } else {
      const newColumns = []
      cacheColumns.forEach((item) => {
        if (columnList.includes(item.prop)) {
          newColumns.push({ ...item })
        }
      })
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.prop) - cacheKeys.indexOf(next.prop)
        })
      }
      columnsRef.value = newColumns
    }
  }

  // 获取原始
  function getCacheColumns() {
    return cacheColumns
  }

  function setCacheColumns(columns) {
    if (!isArray(columns)) return
    cacheColumns = columns.filter((item) => !item.prop)
  }

  function setColumnWidth(w, col) {
    columnsRef.value.forEach((column) => {
      if (column.prop === col.property) {
        column.width = w
        return
      }
    })
    console.log(columnsRef.value)
  }

  return {
    getViewColumns,
    getColumns,
    setColumns,
    getCacheColumns,
    setCacheColumns,
    setColumnWidth
  }
}
