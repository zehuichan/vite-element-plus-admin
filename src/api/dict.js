import request from '@/utils/request'
import { resultSuccess } from './_util'


const DICT_DATA = () => {
  const result = []

  for (let index = 0; index < 100; index++) {
    result.push({
      name: `选项${index}`,
      id: `${index}`
    })
  }
  return result
}

export function getDicts(dictType) {
  return new Promise((resolve, reject) => {
    resolve(resultSuccess(DICT_DATA()))
  })
}
