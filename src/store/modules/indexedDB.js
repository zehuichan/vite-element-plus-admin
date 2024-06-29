import { defineStore } from 'pinia'
import localforage from 'localforage'
import { store } from '..'

export const useIndexedDBStore = defineStore({
  id: 'indexedDB',
  state: () => ({
    settingsDB: localforage.createInstance({ name: 'settingsDB' })
  }),
})

// Need to be used outside the setup
export function useIndexedDBStoreWithOut() {
  return useIndexedDBStore(store)
}
