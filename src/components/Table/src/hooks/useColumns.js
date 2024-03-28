import { computed, ref, toRaw, unref, watch } from 'vue'

import { usePermission } from '@/hooks/web/usePermission'

import { isBoolean, isFunction } from '@/utils/is'
import { localForage } from '@/utils/localforage'

export function useColumns(propsRef) {
  const columnsRef = ref(unref(propsRef).columns)

  const initialized = ref(false)
  const columnProps = ref({})

  const key = 'columnProps_' + unref(propsRef).name

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns
    }
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
    const columns = unref(columnsRef).filter((column) => hasPermission(column.auth) && isIfShow(column))
    return columns.map((column) => {
      column = Object.assign(column, columnProps.value[column.prop])
      return column
    })
  })

  const getHeaderDragend = async () => {
    if (!unref(propsRef).name) {
      initialized.value = true
      return
    }
    columnProps.value = await localForage().getItem(key) || {}
    initialized.value = true
  }

  const setHeaderDragend = async (newWidth, oldWidth, column) => {
    if (!unref(propsRef).name) return
    if (columnProps.value[column.property]) {
      columnProps.value[column.property].width = newWidth
    } else {
      columnProps.value[column.property] = { width: newWidth }
    }
    await localForage().setItem(key, toRaw(columnProps.value))
  }

  return {
    initialized,
    columnProps,
    getViewColumns,
    getHeaderDragend,
    setHeaderDragend
  }
}
