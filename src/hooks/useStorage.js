import { ref, watchEffect } from 'vue'

const prefix = import.meta.env.VITE_WECHAT_APPID

export function useStorage(key, defaultValue) {
  const state = ref(getState())

  function getState() {
    const raw = localStorage.getItem(prefix + key)

    if (raw) {
      try {
        return JSON.parse(raw)
      } catch {
        //
      }
    }

    return defaultValue
  }

  function setState() {
    localStorage.setItem(prefix + key, JSON.stringify(state.value))
  }

  watchEffect(setState)

  return state
}