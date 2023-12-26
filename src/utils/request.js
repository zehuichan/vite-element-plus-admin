import axios from 'axios'

import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

import { useUserStoreWithOut } from '@/store/modules/user'

import { Cache } from '@/utils/cache'

import { TOKEN_KEY } from '@/enums/cacheEnum'

const errorCode = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  'default': '系统未知错误，请反馈给管理员'
}

const abortControllerMap = new Map()

// create an axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // api的base_url
  timeout: 50 * 1000 // request timeout
})

http.interceptors.request.use((config) => {
  const controller = new AbortController()
  config.signal = controller.signal
  abortControllerMap.set(config.url, controller)
  const token = Cache.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, null)

http.interceptors.response.use((response) => {
  const url = response.config.url || ''
  abortControllerMap.delete(url)
  return response.data
}, null)

export const cancelRequest = (url) => {
  const urlList = Array.isArray(url) ? url : [url]
  for (const _url of urlList) {
    abortControllerMap.get(_url)?.abort()
    abortControllerMap.delete(_url)
  }
}

export const cancelAllRequest = () => {
  for (const [_, controller] of abortControllerMap) {
    controller.abort()
  }
  abortControllerMap.clear()
}

export default (config) =>
  new Promise((resolve, reject) => {
    http
      .request(config)
      .then(async (res) => {
        // 未设置状态码则默认成功状态
        const code = res.code || 200
        // 获取错误信息
        const msg = errorCode[code] || res.msg || errorCode['default']    // 二进制数据则直接返回
        // 二进制数据则直接返回
        if (config.responseType === 'blob' || config.responseType === 'arraybuffer') {
          return resolve(res)
        }
        if (code === 401) {
          ElMessageBox.close()
          await ElMessageBox.alert('无效的会话，或者会话已过期，请重新登录!', '确认登出', {
            confirmButtonText: '重新登录',
            type: 'warning'
          })
          const userStore = useUserStoreWithOut()
          await userStore.logout(true)
          return reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          ElMessage({ message: msg, type: 'error' })
          return reject(new Error(msg))
        } else if (code === 601) {
          ElMessage({ message: msg, type: 'warning' })
          return reject(new Error(msg))
        } else if (code !== 200) {
          ElNotification.error({ title: msg })
          return reject(new Error('error'))
        } else {
          return resolve(res)
        }
      })
      .catch((err) => {
        console.log(err)
        return reject(new Error(err))
      })
  })
