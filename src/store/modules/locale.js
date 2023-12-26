import { defineStore } from 'pinia'
import { store } from '..'

import { Cache } from '@/utils/cache'
import { LOCALE_KEY } from '@/enums/cacheEnum'

import { localeSetting } from '@/settings/localeSetting'

const cacheLocaleSetting = Cache.getItem(LOCALE_KEY) || localeSetting

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    localInfo: cacheLocaleSetting
  }),
  getters: {
    getShowPicker(state) {
      return !!state.localInfo?.showPicker
    },
    getLocale(state) {
      return state.localInfo?.locale ?? 'zh_CN'
    },
  },
  actions: {
    setLocaleInfo(info) {
      this.localInfo = { ...this.localInfo, ...info }
      Cache.setItem(LOCALE_KEY, this.localInfo)
    },
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      })
    },
  }
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
