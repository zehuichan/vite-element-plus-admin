import { createInjectionState } from '@vueuse/core'
import { createContext, useContext } from '@/hooks/core/useContext'

const [useProvideAppStore, useAppStore] = createInjectionState((options) => {})

export { useProvideAppStore }
export { useAppStore }

const key = Symbol()

export function createAppProviderContext(context) {
  return createContext(context, key)
}

export function useAppProviderContext() {
  return useContext(key)
}
