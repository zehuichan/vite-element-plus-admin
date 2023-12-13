import { onUnmounted, getCurrentInstance } from 'vue'
import { createContextmenu, destroyContextmenu } from '@/components/Contextmenu'

export function useContextmenu(authRemove = true) {
  if (getCurrentInstance() && authRemove) {
    onUnmounted(() => {
      destroyContextmenu()
    })
  }
  return [createContextmenu, destroyContextmenu]
}
