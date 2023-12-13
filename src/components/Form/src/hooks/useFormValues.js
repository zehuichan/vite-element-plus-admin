import { unref } from 'vue'
import { cloneDeep, set } from 'lodash-es'
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

  function handleFormRules(schema) {
    const {
      rules: defRules = [],
      component,
      rulesMessageJoinLabel,
      label,
      dynamicRules,
      required
    } = schema

    if (isFunction(dynamicRules)) {
      return dynamicRules(formModel)
    }

    let rules = cloneDeep(defRules)
    const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = unref(getProps)

    const joinLabel = Reflect.has(schema, 'rulesMessageJoinLabel')
      ? rulesMessageJoinLabel
      : globalRulesMessageJoinLabel
    const assertLabel = joinLabel ? label : ''
    const defaultMsg = component
      ? createPlaceholderMessage(component) + assertLabel
      : assertLabel

    function validator(rule, value, callback) {
      const msg = rule.message || defaultMsg
      if (value === undefined || isNull(value)) {
        // 空值
        callback(new Error(msg))
      } else if (Array.isArray(value) && value.length === 0) {
        // 数组类型
        callback(new Error(msg))
      } else if (typeof value === 'string' && value.trim() === '') {
        // 空字符串
        callback(new Error(msg))
      } else if (
        typeof value === 'object' &&
        Reflect.has(value, 'checked') &&
        Reflect.has(value, 'halfChecked') &&
        Array.isArray(value.checked) &&
        Array.isArray(value.halfChecked) &&
        value.checked.length === 0 &&
        value.halfChecked.length === 0
      ) {
        // 非关联选择的tree组件
        callback(new Error(msg))
      }
      callback()
    }

    const getRequired = isFunction(required)
      ? required(formModel)
      : required

    if (getRequired) {
      if (!rules || rules.length === 0) {
        rules = [{ required: getRequired, validator }]
      } else {
        const requiredIndex = rules.findIndex((rule) =>
          Reflect.has(rule, 'required')
        )

        if (requiredIndex === -1) {
          rules.push({ required: getRequired, validator })
        }
      }
    }

    return rules
  }

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
    handleFormRules,
    handleFormValues,
    initDefault
  }
}
