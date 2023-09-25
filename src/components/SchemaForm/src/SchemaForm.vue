<template>
  <el-form
    v-bind="getBindValue"
    ref="formElRef"
    require-asterisk-position="right"
    :validate-on-rule-change="false"
    @keypress.enter="handleEnterPress"
  >
    <el-row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <schema-form-item
          :isAdvanced="fieldsIsAdvancedMap[schema.field]"
          :schema="schema"
          :form-props="getProps"
          :all-default-values="defaultValueRef"
          :form-model="formModel"
          :set-form-model="setFormModel"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}" />
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

import { useAdvanced } from './hooks/useAdvanced'
import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'
import { useAutoFocus } from './hooks/useAutoFocus'

import { deepMerge } from '@/utils'

import SchemaFormItem from './components/SchemaFormItem.vue'
import { dateUtil } from '@/utils/dateUtil'
import { dateItemType } from './helper'

export default defineComponent({
  name: 'SchemaForm',
  inheritAttrs: false,
  components: {
    SchemaFormItem
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
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
    baseColProps: {
      type: Object,
      default: () => ({ span: 6 })
    },
    size: String,
    disabled: Boolean,
    autoAdvancedLine: {
      type: Number,
      default: 3
    },
    alwaysShowLines: {
      type: Number,
      default: 1
    },
    showAdvancedButton: Boolean,
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
  emits: ['register', 'update:modelValue', 'field-value-change', 'enter', 'advanced-change'],
  setup(props, { attrs, emit }) {
    const formModel = reactive({})
    const advanceState = reactive({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
    })

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
        const { defaultValue, component, componentProps, isHandleDateDefaultValue = true } = schema
        // handle date type
        if (isHandleDateDefaultValue && defaultValue && dateItemType.includes(component)) {
          const valueFormat = componentProps ? componentProps['valueFormat'] : null
          if (!Array.isArray(defaultValue)) {
            schema.defaultValue = valueFormat
              ? dateUtil(defaultValue).format(valueFormat)
              : dateUtil(defaultValue)
          } else {
            const def = []
            defaultValue.forEach((item) => {
              def.push(valueFormat ? dateUtil(item).format(valueFormat) : dateUtil(item))
            })
            schema.defaultValue = def
          }
        }
      }

      return cloneDeep(schemas)
    })


    const { handleToggleAdvanced, fieldsIsAdvancedMap } = useAdvanced({
      advanceState,
      emit,
      getProps,
      getSchema,
      formModel,
      defaultValueRef
    })

    const { handleFormValues, initDefault } = useFormValues({
      getProps,
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
      appendSchemaByField,
      removeSchemaByField,
      resetFields,
      clearValidate,
      validate,
      validateField,
      scrollToField,
      handleEnter
    } = useFormEvents({
      emit,
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef,
      handleFormValues
    })

    watch(
      () => unref(getProps).modelValue,
      () => {
        const { modelValue } = unref(getProps)
        if (!modelValue) return
        setFieldsValue(modelValue)
      },
      { immediate: true }
    )

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

    function setFormModel(key, value, schema) {
      formModel[key] = value
      emit('update:modelValue', formModel)
      emit('field-value-change', key, value)
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
          handleEnter()
        }
      }
    }

    const formAction = {
      advanceState,
      setProps,
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByField,
      resetFields,
      clearValidate,
      validate,
      validateField,
      scrollToField,
      handleEnterPress,
      handleToggleAdvanced
    }

    onMounted(() => {
      initDefault()
      emit('register', formAction)
    })

    return {
      getBindValue,
      formModel,
      defaultValueRef,
      getRow,
      getProps,
      formElRef,
      getSchema,
      formAction,
      fieldsIsAdvancedMap,
      ...formAction,
      setFormModel,
    }
  }
})
</script>
