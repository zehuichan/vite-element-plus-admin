import { computed, ref, toRaw, unref, watch } from 'vue'

import { usePermission } from '@/hooks/web/usePermission'

import { isBoolean, isFunction } from '@/utils/is'

export function useColumns(propsRef) {
  const columnsRef = ref(unref(propsRef).columns)

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
    return unref(columnsRef).filter((column) => hasPermission(column.auth) && isIfShow(column))
  })

  return {
    getViewColumns,
  }
}
