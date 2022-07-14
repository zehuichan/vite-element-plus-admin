import { getCurrentInstance } from 'vue'

export default function useExpose(apis) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy, apis)
  }
}
