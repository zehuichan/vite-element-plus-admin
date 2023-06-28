import { computed, ref, unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { isBoolean, isFunction } from '@/utils/is'

export function useColumns(propsRef) {
  const columnsRef = ref(unref(propsRef).columns)

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

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(columnsRef))
    const columns = cloneDeep(viewColumns)
    return columns
      .filter((column) => isIfShow(column))
  })

  return {
    getViewColumns
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
