import { unref } from 'vue'
import { findIndex, set } from 'lodash-es'

export function useFormEvents({ getProps }) {

  const delSchema = (field) => {
    const { schema } = unref(getProps)

    const index = findIndex(schema, (v) => v.field === field)
    if (index > -1) {
      schema.splice(index, 1)
    }
  }

  const addSchema = (formSchema, index) => {
    const { schema } = unref(getProps)
    if (index !== void 0) {
      schema.splice(index, 0, formSchema)
      return
    }
    schema.push(formSchema)
  }

  const setSchema = (schemaProps) => {
    const { schema } = unref(getProps)
    for (const v of schema) {
      for (const item of schemaProps) {
        if (v.field === item.field) {
          set(v, item.path, item.value)
        }
      }
    }
  }

  return {
    delSchema,
    addSchema,
    setSchema
  }
}
