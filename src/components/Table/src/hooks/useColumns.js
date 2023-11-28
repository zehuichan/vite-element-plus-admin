import { computed, ref, unref, watch } from 'vue'

import { cloneDeep } from 'lodash-es'

import { usePermission } from '@/hooks/web/usePermission'

import { isArray, isBoolean, isFunction } from '@/utils/is'

function handleItem(item, ellipsis) {
  const { key, dataIndex, children } = item
  item.align = item.align || 'center'
  if (ellipsis) {
    if (!key) {
      item.key = dataIndex
    }
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis,
      })
    }
  }
  if (children && children.length) {
    handleChildren(children, !!ellipsis)
  }
}

function handleChildren(children, ellipsis) {
  if (!children) return
  children.forEach((item) => {
    const { children } = item
    handleItem(item, ellipsis)
    handleChildren(children, ellipsis)
  })
}

export function useColumns(propsRef, getPaginationRef) {
  const columnsRef = ref(unref(propsRef).columns)
  let cacheColumns = unref(propsRef).columns

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns
      cacheColumns = columns?.filter((item) => !item.flag) ?? []
    },
  )

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

  const { hasPermission } = usePermission()

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(columnsRef))
    const columns = cloneDeep(viewColumns)
    return columns
      .filter((column) => hasPermission(column.auth) && isIfShow(column))
  })

  function getCacheColumns() {
    return cacheColumns
  }

  function setCacheColumns(columns) {
    if (!isArray(columns)) return
    cacheColumns = columns.filter((item) => !item.flag)
  }

  return {
    getViewColumns,
    getCacheColumns,
    setCacheColumns
  }
}

function sortFixedColumn(columns) {
  const fixedLeftColumns = []
  const fixedRightColumns = []
  const defColumns = []
  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column)
      continue
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column)
      continue
    }
    defColumns.push(column)
  }
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter(
    (item) => !item.hidden,
  )
}
