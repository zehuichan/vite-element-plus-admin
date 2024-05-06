import { unref } from 'vue'
import { cloneDeep, set } from 'lodash-unified'
import {
  isArray,
  isFunction, isNull,
  isNullOrUnDef,
  isObject,
  isString
} from '@/utils/is'
import { createPlaceholderMessage } from '@/components/Form/src/helper'

/**
 * @desription deconstruct array-link key. This method will mutate the target.
 */
function tryDeconstructArray(key, value, target) {
  const pattern = /^\[(.+)\]$/
  if (pattern.test(key)) {
    const match = key.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      value = Array.isArray(value) ? value : [value]
      keys.forEach((k, index) => {
        set(target, k.trim(), value[index])
      })
      return true
    }
  }
}

/**
 * @desription deconstruct object-link key. This method will mutate the target.
 */
function tryDeconstructObject(key, value, target) {
  const pattern = /^\{(.+)\}$/
  if (pattern.test(key)) {
    const match = key.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      value = isObject(value) ? value : {}
      keys.forEach((k) => {
        set(target, k.trim(), value[k.trim()])
      })
      return true
    }
  }
}

export function useFormValues({ defaultValueRef, getSchema, formModel, getProps }) {

  function handleFormValues(values) {
    if (!isObject(values)) {
      return {}
    }
    const res = {}
    for (const item of Object.entries(values)) {
      let [, value] = item
      const [key] = item
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue
      }
      // 删除空格
      if (isString(value)) {
        value = value.trim()
      }
      if (!tryDeconstructArray(key, value, res) && !tryDeconstructObject(key, value, res)) {
        // 没有解构成功的，按原样赋值
        set(res, key, value)
      }
    }
    return res
  }

  function initDefault() {
    const schemas = unref(getSchema)
    const obj = {}
    schemas.forEach((item) => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue

        if (formModel[item.field] === undefined) {
          formModel[item.field] = defaultValue
        }
      }
    })
    defaultValueRef.value = cloneDeep(obj)
  }

  return {
    handleFormValues,
    initDefault
  }
}
