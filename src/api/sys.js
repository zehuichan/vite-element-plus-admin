import request from '@/utils/request'
import { resultSuccess } from './_util'
import { MENU_DATA } from './_data'

export function menu() {
  return new Promise((resolve, reject) => {
    resolve(resultSuccess(MENU_DATA))
  })
}
