import { defineStore } from 'pinia'
import { store } from '@/store'
import cache from '@/utils/cache'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    sidebar: {
      opened: cache.getItem('sidebarStatus') ? !!+cache.getItem('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: cache.getItem('size') || 'small'
  }),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        cache.setItem('sidebarStatus', 1)
      } else {
        cache.setItem('sidebarStatus', 0)
      }
    },
    closeSideBar(withoutAnimation) {
      cache.setItem('sidebarStatus', 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    }
  }
})

export function useAppStoreWithInstall() {
  return useAppStore(store)
}