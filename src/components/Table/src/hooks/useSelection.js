import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { listenerRouteChange } from '@/install/plugins/router-change'

export const useSelection = createGlobalState(() => {
  // 选中项
  const currentRef = ref(null)
  const selectionRef = ref([])
  // 业务表
  const table = ref(null)

  const tempIds = computed(() => selectionRef.value.map(item => item.id))

  listenerRouteChange((route) => {
    selectionRef.value = []
  })

  const handleCurrentChange = (val, bus_table) => {
    currentRef.value = val
    table.value = bus_table
  }

  const handleSelectionChange = (val, bus_table) => {
    selectionRef.value = val
    table.value = bus_table
  }

  return {
    tempIds,
    currentRef,
    selectionRef,
    table,
    handleCurrentChange,
    handleSelectionChange
  }
})
