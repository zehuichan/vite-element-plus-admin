import { onUnmounted, ref, unref } from 'vue'
import { isProdMode } from '@/utils/env'

export function useTable(options) {
  const { propertys = [] } = options ?? {}

  const tableRef = ref(null)
  const loadedRef = ref(false)

  function getTableInstance() {
    const table = unref(tableRef)
    if (!table) {
      console.error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!',
      )
    }
    return table
  }

  function register(instance) {
    // 开发环境下，组件卸载后释放内存
    isProdMode() &&
    onUnmounted(() => {
      tableRef.value = null
      loadedRef.value = null
    })

    // form 组件实例 instance 已存在
    // 实际上 register 拿到的并不是 组件实例， 只是挂载了一些组件内部方法的 对象 formAction
    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return

    tableRef.value = instance
    loadedRef.value = true
  }

  const methods = {}

  return [register, methods]
}
