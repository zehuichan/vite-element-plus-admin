import { toRaw, unref } from 'vue'
import { isArray, isEmpty, isNullOrUnDef, isObject, isString } from '@/utils/is'
import { cloneDeep, set, uniqBy } from 'lodash-es'
import { deepMerge } from '@/utils'
import { defaultValueComponents } from '@/components/Form/src/helper'

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
    // todo 简易处理
    Object.keys(values).forEach((key) => {
      formModel[key] = values[key]
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
      (item) => item.component === 'Divider' || (Reflect.has(item, 'field') && item.field)
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
    if (schemaList.find((item) => addSchemaIds.includes(item.field))) {
      error('There are schemas that have already been added')
      return
    }
    const index = schemaList.findIndex((schema) => schema.field === prefixField)
    const _schemaList = isObject(schema) ? [schema] : schema
    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schema) : schemaList.push(..._schemaList)
    } else if (index !== -1) {
      schemaList.splice(index + 1, 0, ..._schemaList)
    }
    schemaRef.value = schemaList
    _setDefaultValue(schema)
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

  const validate = (callback) => {
    return unref(formElRef).validate(callback)
  }

  const validateField = (prop, callback) => {
    return unref(formElRef).validateField(prop, callback)
  }

  const resetFields = (prop) => {
    return unref(formElRef).resetFields(prop)
  }

  const scrollToField = (prop) => {
    return unref(formElRef).scrollToField(prop)
  }

  const clearValidate = (props) => {
    return unref(formElRef).clearValidate(props)
  }

  return {
    updateSchema,
    resetSchema,
    appendSchemaByField,
    removeSchemaByField,
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate
  }
}

function getDefaultValue(schema, defaultValueRef, key) {
  let defaultValue = cloneDeep(defaultValueRef.value[key])
  const isInput = checkIsInput(schema)
  if (isInput) {
    return defaultValue || ''
  }
  if (!defaultValue && schema && checkIsRangeSlider(schema)) {
    defaultValue = [0, 0]
  }
  return defaultValue
}

function checkIsRangeSlider(schema) {
  if (schema.component === 'Slider' && schema.componentProps && schema.componentProps.range) {
    return true
  }
}

function checkIsInput(schema) {
  return schema?.component && defaultValueComponents.includes(schema.component)
}
