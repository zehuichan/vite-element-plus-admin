import { ref, unref, nextTick } from 'vue'
import { isEmpty, isObject } from '@/utils/is'

export const useForm = (props) => {
  const formRef = ref(null)

  // todo
  const register = (instance) => {
    formRef.value = instance
    instance.setProps(props)
  }

  const getInstance = async () => {
    const form = unref(formRef)
    if (!form) {
      throw new Error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      )
    }
    await nextTick()
    return form
  }

  // 一些内置的方法
  const methods = {
    setProps: async (...args) => (await getInstance()).setProps(...args),
    updateSchema: async (data) => {
      const form = await getInstance()
      form?.updateSchema(data)
    },
    resetSchema: async (data) => {
      const form = await getInstance()
      form?.resetSchema(data)
    },
    appendSchemaByField: async (schema, prefixField, first) => {
      const form = await getInstance()
      form?.appendSchemaByField(schema, prefixField, first)
    },
    removeSchemaByField: async (field) => {
      const form = await getInstance()
      form?.removeSchemaByField(field)
    },
    validate: async (...args) => (await getInstance()).validate(...args),
    validateField: async (...args) => (await getInstance()).validateField(...args),
    resetFields: async (...args) => (await getInstance()).resetFields(...args),
    scrollToField: async (...args) => (await getInstance()).scrollToField(...args),
    clearValidate: async (...args) => (await getInstance()).clearValidate(...args),
  }

  return [register, methods]
}
