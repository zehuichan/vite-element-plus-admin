import { defineStore } from 'pinia'
import { store } from '..'

import { Cache } from '@/utils/cache'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { deepMerge } from '@/utils'

import projectConfig from '@/settings/projectSetting'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Cache.getItem(PROJ_CFG_KEY, projectConfig)
  }),
  getters: {
    getProjectConfig() {
      return this.projectConfig || {}
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
      Cache.setItem(PROJ_CFG_KEY, this.projectConfig)
    },
    setMenuSetting(setting) {
      this.projectConfig.menuSetting = deepMerge(this.projectConfig.menuSetting || {}, setting)
      Cache.setItem(PROJ_CFG_KEY, this.projectConfig)
    },
    resetAllState() {
      Cache.clear()
    },
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
