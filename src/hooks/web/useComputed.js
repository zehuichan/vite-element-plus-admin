import { computed } from 'vue'

export function useComputed(fn) {
  const cache = new Map()

  function compare(a, b) {
    return (a.length === b.length && a.every((item, index) => Object.is(item, b[index])))
  }

  function getCache(args) {
    const keys = [...cache.keys()]
    const key = keys.find(item => compare(item, args))
    if (key) {
      return cache.get(key)
    }
  }

  return function(...args) {
    const cachedResult = getCache(args)
    if (cachedResult) {
      return cachedResult.value
    }
    const result = computed(() => fn(...args))
    cache.set(args, result)
    return result.value
  }
}
