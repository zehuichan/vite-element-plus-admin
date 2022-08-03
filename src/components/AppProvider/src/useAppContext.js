import { createContext, useContext } from '@/hooks/core/useContext'

const key = Symbol()

export function createAppProviderContext(context) {
  return createContext(context, key)
}

export function useAppProviderContext() {
  return useContext(key)
}
