import { computed, ref, toRaw } from 'vue'
import { localForage } from '@/utils/localforage'

export const useTableHeader = (config) => {
  const { tableId = 1 } = config || {}

  const initialized = ref(false)
  const columnsMap = ref({})

  const key = computed(() => {
    return `@@${tableId}`
  })

  const getHeaderDragend = async () => {
    if (!key.value) {
      initialized.value = true
      return
    }
    columnsMap.value = await localForage().getItem(key.value) || {}
    initialized.value = true
  }

  const setHeaderDragend = async (newWidth, oldWidth, column) => {
    if (columnsMap.value[column.property]) {
      columnsMap.value[column.property].width = newWidth
    } else {
      columnsMap.value[column.property] = { width: newWidth }
    }
    await localForage().setItem(key.value, toRaw(columnsMap.value))
  }

  return {
    initialized,
    columnsMap,
    getHeaderDragend,
    setHeaderDragend
  }
}
