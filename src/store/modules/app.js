import { defineStore } from 'pinia'
import { store } from '..'

import { useBreakpoints } from '@vueuse/core'

import { Cache } from '@/utils/cache'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { deepMerge } from '@/utils'

import projectConfig from '@/settings/projectSetting'

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

let timeId
export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    breakpoint: breakpoints.active(),
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Cache.getItem(PROJ_CFG_KEY, projectConfig)
  }),
  getters: {
    getBreakpoint() {
      return this.breakpoint
    },
    getIsMobile() {
      return this.breakpoint === 'mobile'
    },
    getPageLoading() {
      return this.pageLoading
    },
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
    setPageLoading(loading) {
      this.pageLoading = loading
    },
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
    setPageLoadingAction(loading) {
      if (loading) {
        clearTimeout(timeId)
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
