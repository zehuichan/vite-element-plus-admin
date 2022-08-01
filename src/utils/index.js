import { unref } from 'vue'
import { isObject } from '@/utils/is'

export const noop = () => {}

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
    matched: matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined
  }
}
