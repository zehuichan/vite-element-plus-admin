import { reactive, toRefs } from 'vue'
import { getDict } from '@/api'

export function useDict(...args) {
  const res = reactive({})
  return (() => {
    args.forEach((d) => {
      res[d] = []
      getDict(d).then((resp) => {
        res[d] = resp.data.map((p) => ({ ...p, text: p.name }))
      })
    })
    return toRefs(res)
  })()
}
