import { useErrorLogStore } from '@/store/modules/errorLog'
import { isArray, isString } from '@/utils/is'
import settings from '../settings'

// you can set in settings.js
// errorLog: 'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

export function setupErrorLog(app) {
  if (checkNeed()) {
    app.config.errorHandler = (err, vm, info) => {
      // todo 前端错误上报到收集报错的平台
      const errorLogStore = useErrorLogStore()
      errorLogStore.addErrorLog({
        err,
        info,
        url: location.href
      })
    }
  }
}
