import { nextTick, toRaw, unref } from 'vue'
import { isArray, isEmpty, isNullOrUnDef, isObject, isString } from '@/utils/is'
import { cloneDeep, set, uniqBy } from 'lodash-es'
import { deepMerge } from '@/utils'

function tryConstructArray(field, values = {}) {
  const pattern = /^\[(.+)\]$/
  if (pattern.test(field)) {
    const match = field.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      if (!keys.length) {
        return undefined
      }

      const result = []
      keys.forEach((k, index) => {
        set(result, index, values[k.trim()])
      })

      return result.filter(Boolean).length ? result : undefined
    }
  }
}

function tryConstructObject(field, values = {}) {
  const pattern = /^\{(.+)\}$/
  if (pattern.test(field)) {
    const match = field.match(pattern)
    if (match && match[1]) {
      const keys = match[1].split(',')
      if (!keys.length) {
        return
      }

      const result = {}
      keys.forEach((k) => {
        set(result, k.trim(), values[k.trim()])
      })

      return Object.values(result).filter(Boolean).length ? result : undefined
    }
  }
}

export function useFormEvents({
                                emit,
                                getProps,
                                formModel,
                                getSchema,
                                defaultValueRef,
                                formElRef,
                                schemaRef,
                                handleFormValues
                              }) {
  //设置表单值
  async function setFieldsValue(values) {
    const schemas = unref(getSchema)
    const fields = schemas.map((item) => item.field).filter(Boolean)

    Object.keys(values).forEach((key) => {
      const value = values[key]
      if (fields.includes(key)) {
        formModel[key] = value
      }
    })
  }

  //获取表单值
  function getFieldsValue() {
    const formEl = unref(formElRef)
    if (!formEl) return {}
    return handleFormValues(toRaw(unref(formModel)))
  }

  async function updateSchema(data) {
    let updateData = []
    if (isObject(data)) {
      updateData.push(data)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(
      (item) =>
        item.component === 'Divider' ||
        (Reflect.has(item, 'field') && item.field)
    )

    if (!hasField) {
      console.error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      )
      return
    }
    const schema = []
    unref(getSchema).forEach((val) => {
      let _val
      updateData.forEach((item) => {
        if (val.field === item.field) {
          _val = item
        }
      })
      if (_val !== undefined && val.field === _val.field) {
        const newSchema = deepMerge(val, _val)
        schema.push(newSchema)
      } else {
        schema.push(val)
      }
    })
    _setDefaultValue(schema)

    schemaRef.value = uniqBy(schema, 'field')
  }

  async function resetSchema(data) {
    let updateData = []
    if (isObject(data)) {
      updateData.push(data)
    }
    if (isArray(data)) {
      updateData = [...data]
    }

    const hasField = updateData.every(
      (item) => item.component === 'Divider' || (Reflect.has(item, 'field') && item.field)
    )

    if (!hasField) {
      console.error(
        'All children of the form Schema array that need to be updated must contain the `field` field'
      )
      return
    }
    schemaRef.value = updateData
  }

  async function appendSchemaByField(schema, prefixField, first = false) {
    const schemaList = cloneDeep(unref(getSchema))
    const addSchemaIds = Array.isArray(schema)
      ? schema.map((item) => item.field)
      : [schema.field]

    const index = schemaList.findIndex((schema) => schema.field === prefixField)
    const _schemaList = isObject(schema) ? [schema] : schema
    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(..._schemaList)
      schemaRef.value = schemaList
      _setDefaultValue(schema)
      return
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, ..._schemaList)
    }
    _setDefaultValue(schema)

    schemaRef.value = schemaList
  }

  async function removeSchemaByField(fields) {
    const schemaList = cloneDeep(unref(getSchema))
    if (!fields) {
      return
    }

    let fieldList = isString(fields) ? [fields] : fields
    if (isString(fields)) {
      fieldList = [fields]
    }
    for (const field of fieldList) {
      _removeSchemaByFeild(field, schemaList)
    }
    schemaRef.value = schemaList
  }

  function validate(cb) {
    return unref(formElRef).validate(cb)
  }

  async function validateField(prop, callback) {
    return await unref(formElRef).validateField(prop, callback)
  }

  function resetFields() {
    Object.keys(formModel).forEach((key) => {
      const defaultValue = cloneDeep(defaultValueRef.value[key])
      formModel[key] = defaultValue ?? ''
    })

    unref(formElRef).resetFields()

    return handleFormValues(toRaw(unref(formModel)))
  }

  async function scrollToField(prop) {
    return await unref(formElRef).scrollToField(prop)
  }

  async function clearValidate(name) {
    await unref(formElRef).clearValidate(name)
  }

  async function handleEnter() {
    const formEl = unref(formElRef)
    if (!formEl) return
    try {
      await validate()
      emit('enter')
    } catch (error) {
      console.log(error)
    }
  }

  function _removeSchemaByFeild(field, schemaList) {
    if (isString(field)) {
      const index = schemaList.findIndex((schema) => schema.field === field)
      if (index !== -1) {
        delete formModel[field]
        schemaList.splice(index, 1)
      }
    }
  }

  function _setDefaultValue(data) {
    let schemas = []
    if (isObject(data)) {
      schemas.push(data)
    }
    if (isArray(data)) {
      schemas = [...data]
    }

    const obj = {}
    const currentFieldsValue = getFieldsValue()
    schemas.forEach((item) => {
      if (
        item.component != 'Divider' &&
        Reflect.has(item, 'field') &&
        item.field &&
        !isNullOrUnDef(item.defaultValue) &&
        (!(item.field in currentFieldsValue) ||
          isNullOrUnDef(currentFieldsValue[item.field]) ||
          isEmpty(currentFieldsValue[item.field]))
      ) {
        obj[item.field] = item.defaultValue
      }
    })
    setFieldsValue(obj)
  }

  return {
    setFieldsValue,
    getFieldsValue,
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByField,
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate,
    handleEnter
  }
}
