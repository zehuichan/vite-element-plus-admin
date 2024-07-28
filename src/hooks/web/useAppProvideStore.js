import { createContext, useContext } from '@/hooks/core/useContext'

const KEY = Symbol('app-provide')

export function useAppProvideStore(context) {
  return createContext(context, KEY)
}

export function useAppInjectStore() {
  return useContext(KEY)
}
