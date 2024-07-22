import { computed, reactive, unref } from 'vue'
import { createInjectionState } from '@vueuse/core'

const KEY = Symbol('app-provide')

const [useAppProvideStore, useAppInjectStore] = createInjectionState(
  (context) => {
    const state = reactive(context)
    console.log('1',context)
    return state
  },
  { injectionKey: KEY }
)

export { useAppProvideStore, useAppInjectStore }
