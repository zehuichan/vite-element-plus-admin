import { computed, ref } from 'vue'
import { listenerRouteChange } from '@/install/plugins/router-change'

export function useSelection(tableRef) {

  const currentRef = ref(null)
  const selectionRef = ref([])

  const selectionIds = computed(() => selectionRef.value.map(item => item.id))

  listenerRouteChange(() => {
    tableRef.value?.clearSelection()
  })

  const handleCurrentChange = (val) => {
    currentRef.value = val
  }

  const handleSelectionChange = (val) => {
    selectionRef.value = val
  }

  return {
    currentRef,
    selectionRef,
    selectionIds,
    handleCurrentChange,
    handleSelectionChange
  }
}
