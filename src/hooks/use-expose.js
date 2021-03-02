import {getCurrentInstance} from 'vue'

const useExpose = (apis) => {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance.proxy, apis)
  }
}

export default useExpose