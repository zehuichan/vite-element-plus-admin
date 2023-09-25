import { unref } from 'vue'
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

export function sleep(timeout = 1 * 1000) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
