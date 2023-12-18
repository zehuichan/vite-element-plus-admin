import { getCurrentInstance } from 'vue'
import { extend } from 'lodash-es'

export function useExpose(apis) {
  const instance = getCurrentInstance()
  if (instance) {
    extend(instance.proxy, apis)
  }
}
