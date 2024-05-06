import { computed, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { listenerRouteChange } from '@/install/plugins/router-change'

export const useSelection = () => {

  const currentRef = ref(null)
  const selectionRef = ref([])

  const selectionIds = computed(() => selectionRef.value.map(item => item.id))

  const handleCurrentChange = (val) => {
    currentRef.value = val
    console.log(currentRef.value)
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
