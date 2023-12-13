import { unref } from 'vue'
import { assign, findIndex, set } from 'lodash-es'
import { isArray, isObject } from '@/utils/is'

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

  const delSchema = (field) => {
    const { schema } = unref(getProps)

    const index = findIndex(schema, (v) => v.field === field)
    if (index > -1) {
      schema.splice(index, 1)
    }
  }

  const addSchema = (formSchema, index) => {
    const { schemas } = unref(getProps)
    const _schemaList = isObject(formSchema) ? [formSchema] : formSchema
    if (index !== void 0) {
      schemas.splice(index, 0, ..._schemaList)
      return
    }
    schemas.push(..._schemaList)
  }

  const setSchema = (schemaProps) => {
    let updateData = []
    if (isObject(schemaProps)) {
      updateData.push(schemaProps)
    }
    if (isArray(schemaProps)) {
      updateData = [...schemaProps]
    }
    const schema = []
    for (const schema of unref(getSchema)) {
      for (const item of updateData) {
        if (schema.field === item.field) {
          assign(schema, item)
        }
      }
    }
  }

  const resetSchema = (data) => {
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
    delSchema,
    addSchema,
    setSchema,
    resetSchema,
    validate,
    validateField,
    resetFields,
    scrollToField,
    clearValidate
  }
}
