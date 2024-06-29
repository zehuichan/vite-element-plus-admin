import { provide, inject } from 'vue'

const key = Symbol('vc-table')

export function createTableContext(instance) {
  provide(key, instance)
}

export function useTableContext() {
  return inject(key)
}
