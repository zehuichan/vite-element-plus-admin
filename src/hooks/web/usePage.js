import { unref } from 'vue'

import { useRouter } from 'vue-router'
import { REDIRECT_NAME } from '@/router/constant'

function handleError(e) {
  console.error(e)
}

/**
 * page switch
 */
export function useGo(_router) {
  const { push, replace } = _router || useRouter()

  function go(opt, isReplace = false) {
    if (!opt) {
      return
    }
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
  }

  return go
}

/**
 * @description: redo current page
 */
export const useRedo = (_router) => {
  const { replace, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)

  function redo() {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      replace({ path: `/redirect/${ fullPath }`, params, query }).then(() => resolve(true))
    })
  }

  return redo
}
