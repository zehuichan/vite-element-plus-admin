import { defineStore } from 'pinia'
import { store } from '..'

import cache, { PROJ_CFG_KEY } from '@/utils/cache'
import { deepMerge } from '@/utils'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    projectConfig: cache.getItem(PROJ_CFG_KEY)
  }),
  getters: {
    getProjectConfig() {
      return this.projectConfig
    },
    getHeaderSetting() {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting() {
      return this.getProjectConfig.menuSetting
    },
    getMultiTabsSetting() {
      return this.getProjectConfig.multiTabsSetting
    }
  },
  actions: {
    setProjectConfig(config) {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      cache.setItem(PROJ_CFG_KEY, this.projectConfig)
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
