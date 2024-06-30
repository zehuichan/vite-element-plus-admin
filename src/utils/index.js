import { createApp, unref, h } from 'vue'
import { ElIcon } from 'element-plus'

import { isObject } from '@/utils/is'

export const noop = () => {
}

export function setObjToUrlParams(baseUrl, obj) {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

// 深度合并
export function deepMerge(src = {}, target = {}) {
  let key
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}

export function openWindow(url, opt) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// dynamic use hook props
export function getDynamicProps(props) {
  const ret = {}

  Object.keys(props).map((key) => {
    ret[key] = unref(props[key])
  })

  return ret
}

export function getRawRoute(route) {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
        meta: item.meta,
        name: item.name,
        path: item.path
      }))
      : undefined)
  }
}

export function withInstall(options) {
  options.install = (app) => {
    const { name } = options
    app.component(name, options)
  }
  return options
}

export function mountComponent(RootComponent) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    },
  }
}

export function looseToNumber(val) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export function getAssetsImage(path) {
  return new URL(`/src/assets/images/${path}`, import.meta.url).href // 本地文件路径
}

export function sleep(timeout = 1000) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export async function poll(fn, validate, interval = 2500) {
  const resolver = async (resolve, reject) => {
    try {
      // catch any error thrown by the "fn" function
      const result = await fn() // fn does not need to be asynchronous or return promise
      // call validator to see if the data is at the state to stop the polling
      const valid = validate(result)
      if (valid === true) {
        resolve(result)
      } else if (valid === false) {
        setTimeout(resolver, interval, resolve, reject)
      } // if validator returns anything other than "true" or "false" it stops polling
    } catch (e) {
      reject(e)
    }
  }
  return new Promise(resolver)
}

export function closest(arr, target) {
  return arr.reduce((pre, cur) =>
    Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur,
  )
}

export function renderIcon(icon) {
  return () => h(ElIcon, null, { default: () => h(icon) })
}

export const uniqueArr = (arr) => Array.from(new Set(arr))
