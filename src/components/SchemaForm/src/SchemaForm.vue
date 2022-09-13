<template>
  <el-form
    v-bind="getBindValue"
    ref="formElRef"
    :model="formModel"
    :validate-on-rule-change="false"
    @keyup.enter="handleEnterPress"
  >
    <el-row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <schema-form-item
          :schema="schema"
          :form-props="getProps"
          :all-default-values="defaultValueRef"
          :form-model="formModel"
          v-model="formModel[schema.field]"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </schema-form-item>
      </template>
      <slot name="formFooter"></slot>
    </el-row>
  </el-form>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  unref,
  watch
} from 'vue'
import { cloneDeep, pick } from 'lodash-es'

import { formProps } from 'element-plus'

import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'
import { useAutoFocus } from './hooks/useAutoFocus'

import { deepMerge } from '@/utils'

import SchemaFormItem from './components/SchemaFormItem.vue'

export default defineComponent({
  name: 'SchemaForm',
  components: {
    SchemaFormItem
  },
  inheritAttrs: false,
  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // 表单配置规则
    schemas: {
      type: [Array],
      default: () => []
    },
    size: String,
    disabled: Boolean,
    rulesMessageJoinLabel: {
      type: Boolean,
      default: true
    },
    autoSubmitOnEnter: Boolean,
    autoSetPlaceHolder: {
      type: Boolean,
      default: true
    },
    autoFocusFirstItem: Boolean
  },
  emits: ['register', 'field-value-change'],
  setup(props, { attrs, emit }) {
    const formModel = reactive({})

    const defaultValueRef = ref({})
    const isInitedDefaultRef = ref(false)
    const propsRef = ref({})
    const schemaRef = ref(null)
    const formElRef = ref(null)

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) }
    })

    const getRow = computed(() => {
      const { baseRowStyle = {}, rowProps = { gutter: 20 } } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps
      }
    })

    const getBindValue = computed(() => {
      return pick(
        { ...attrs, ...props, ...unref(getProps) },
        Object.keys(formProps)
      )
    })

    const getSchema = computed(() => {
      const schemas = unref(schemaRef) || unref(getProps).schemas
      for (const schema of schemas) {
        const { defaultValue } = schema
        if (defaultValue) {
          schema.defaultValue = defaultValue
        }
      }
      return cloneDeep(schemas)
    })

    const { handleFormValues, initDefault } = useFormValues({
      defaultValueRef,
      getSchema,
      formModel
    })

    useAutoFocus({
      getSchema,
      getProps,
      isInitedDefault: isInitedDefaultRef,
      formElRef
    })

    const {
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      resetSchema,
      resetFields,
      clearValidate,
      validate,
      validateField,
      scrollToField
    } = useFormEvents({
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef,
      handleFormValues
    })

    watch(
      () => unref(getProps).schemas,
      (schemas) => {
        resetSchema(schemas ?? [])
      }
    )

    watch(
      () => getSchema.value,
      (schema) => {
        if (unref(isInitedDefaultRef)) {
          return
        }
        if (schema?.length) {
          initDefault()
          isInitedDefaultRef.value = true
        }
      }
    )

    async function setProps(formProps) {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    const formAction = {
      setProps,
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      resetSchema,
      resetFields,
      clearValidate,
      validate,
      validateField,
      scrollToField
    }

    function handleEnterPress(e) {
      const { autoSubmitOnEnter } = unref(getProps)
      if (!autoSubmitOnEnter) return
      if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
        const { target } = e
        if (
          target &&
          target.tagName &&
          target.tagName.toUpperCase() == 'INPUT'
        ) {
          console.log('submit')
        }
      }
    }

    onMounted(() => {
      initDefault()
      emit('register', formAction)
    })

    return {
      getBindValue,
      formModel,
      defaultValueRef,
      propsRef,
      getSchema,
      getRow,
      getProps,
      formElRef,
      formAction,

      handleEnterPress,
      ...formAction
    }
  }
})
</script>
