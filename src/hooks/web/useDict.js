import { reactive } from 'vue'
import { useDictStore } from '@/store/modules/dict'

export function useDict(...args) {
  const dictStore = useDictStore()
  const res = reactive({})
  return (() => {
    args.forEach((d) => {
      res[d] = dictStore.getDictDatas[d] || []
    })
    return res
  })()
}

export function getDictData(dictType, value) {
  const dictStore = useDictStore()
  // 获取 dictType 对应的数据字典数组
  const dictDatas = dictStore.getDictDatas[dictType]
  if (!dictDatas || dictDatas.length === 0) {
    return ''
  }
  // 获取 value 对应的展示名
  value = value + '' // 强制转换成字符串，因为 DictData 小类数值，是字符串
  for (const dictData of dictDatas) {
    if (dictData.value === value) {
      return dictData
    }
  }
  return undefined
}

export function getDictDataLabel(dictType, value) {
  const dict = getDictData(dictType, value)
  return dict ? dict.label : ''
}
