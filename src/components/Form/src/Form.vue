<script lang="jsx">
import { computed, defineComponent, reactive, ref, unref, onMounted, watch } from 'vue'

import { formProps as elFormProps } from 'element-plus'

import { cloneDeep, pick } from 'lodash-es'

import { useVModel } from '@vueuse/core'

import { dateUtil } from '@/utils/dateUtil'
import { isBoolean, isFunction } from '@/utils/is'
import { deepMerge } from '@/utils'
import { getSlot } from '@/utils/jsxHelper'

import { componentMap } from './componentMap'
import { createPlaceholderMessage, dateItemType } from './helper'

import { useAdvanced } from './hooks/useAdvanced'
import { useFormEvents } from './hooks/useFormEvents'
import { useAutoFocus } from './hooks/useAutoFocus'
import { useFormValues } from './hooks/useFormValues'

import { useComputed } from '@/hooks/web/useComputed'

import { formProps, formEmits } from './Form'
import { useExpose } from '@/hooks/core/useExpose'

const COMPONENT_NAME = 'VcForm'
export default defineComponent({
  name: 'VcForm',
  inheritAttrs: false,
  props: formProps,
  emits: formEmits,
  setup(props, { attrs, emit, slots,expose }) {
    const defaultValueRef = ref({})
    const isInitedDefaultRef = ref(false)
    const propsRef = ref({})
    const schemaRef = ref(null)
    const formElRef = ref(null)

    const advanceState = reactive({
      isAdvanced: true,
      hideAdvanceBtn: false,
      isLoad: false,
    })

    const state = useVModel(props, 'modelValue', emit, { defaultValue: {} })

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) }
    })

    const getBindValue = computed(() => {
      return pick(
        { ...attrs, ...props, ...unref(getProps) },
        Object.keys(elFormProps)
      )
    })

    const getRow = computed(() => {
      const { baseRowStyle = {}, rowProps = { gutter: 20 } } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps
      }
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
      formModel: unref(state),
    })

    const { handleFormRules, handleFormValues, initDefault } = useFormValues({
      getProps,
      defaultValueRef,
      getSchema,
      formModel: unref(state),
    })

    useAutoFocus({
      getSchema,
      getProps,
      isInitedDefault: isInitedDefaultRef,
      formElRef
    })

    const {
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
    } = useFormEvents({
      emit,
      getProps,
      formModel: unref(state),
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef,
      handleFormValues
    })

    const setProps = (formProps) => {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    const handleEnterPress = (e) => {
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

    const formActions = {
      setProps,
      updateSchema,
      resetSchema,
      appendSchemaByField,
      removeSchemaByField,
      validate,
      validateField,
      resetFields,
      scrollToField,
      clearValidate,
      handleToggleAdvanced
    }

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

    onMounted(() => {
      initDefault()
      emit('register', formActions)
    })

    useExpose(formActions)

    const getValues = useComputed((schema) => {
      return {
        field: schema.field,
        model: unref(state),
        schema,
      }
    })

    const getComponentsProps = useComputed((schema) => {
      let { componentProps = {} } = schema
      if (isFunction(componentProps)) {
        componentProps = componentProps(getValues(schema)) ?? {}
      }
      if (schema.component === 'Divider') {
        componentProps = Object.assign(
          { direction: 'horizontal', contentPosition: 'left' },
          componentProps
        )
      }
      return componentProps
    })

    const getShow = useComputed((schema) => {
      const { show, ifShow } = schema
      schema.isAdvanced = fieldsIsAdvancedMap[schema.field]
      const itemIsAdvanced = isBoolean(schema.isAdvanced) ? schema.isAdvanced : true

      let isShow = true
      let isIfShow = true

      if (isBoolean(show)) {
        isShow = show
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(show)) {
        isShow = show(getValues(schema))
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(getValues(schema))
      }

      isShow = isShow && itemIsAdvanced

      return { isShow, isIfShow }
    })

    const getDisable = useComputed((schema) => {
      const { disabled: globDisabled } = props
      const { dynamicDisabled } = schema
      const { disabled: itemDisabled = false } = getComponentsProps(schema)
      let disabled = !!globDisabled || itemDisabled
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(getValues(schema))
      }
      return disabled
    })

    const renderFormItemWrap = () => {
      return unref(getSchema).map(schema => {
        const { colProps = {}, colSlot, renderColContent } = schema

        const { baseColProps = {} } = unref(getProps)
        const realColProps = { ...baseColProps, ...colProps }
        const { isIfShow, isShow } = getShow(schema)
        const values = getValues(schema)
        const disabled = getDisable(schema)
        const data = { ...values, disabled }

        const getContent = () => {
          return colSlot
            ? getSlot(slots, colSlot, data)
            : renderColContent
              ? renderColContent(data)
              : renderFormItem(schema)
        }

        return (
          isIfShow && (
            <el-col {...realColProps} v-show={isShow}>
              {getContent()}
            </el-col>
          )
        )
      })
    }

    const renderLabelHelpMessage = (schema) => {
      const { field, label } = schema
      const labelSlot = `form-${field}-label`
      return labelSlot ? getSlot(slots, labelSlot) : label
    }

    const renderFormItem = (schema) => {
      const { itemProps, slot, render, field, label, component } = schema
      if (component === 'Divider') {
        return (
          <el-col span={24}>
            <el-divider {...getComponentsProps(schema)}>{label}</el-divider>
          </el-col>
        )
      } else {
        const values = getValues(schema)
        const disabled = getDisable(schema)
        const data = { ...values, disabled }
        const getContent = (schema) => {
          return slot
            ? getSlot(slots, slot, data)
            : render
              ? render(data)
              : renderComponent(schema)
        }

        return (
          <el-form-item {...itemProps} label={label} prop={field} rules={handleFormRules(schema)}>
            {{
              label: () => renderLabelHelpMessage(schema),
              default: () => getContent(schema)
            }}
          </el-form-item>
        )
      }
    }

    const renderComponent = (schema) => {
      const { renderComponentContent, component, slot, field } = schema

      if (!((component && componentMap.has(component)) || slot)) {
        return null
      }

      const Comp = componentMap.get(component)

      const { autoSetPlaceHolder, size } = unref(getProps)

      const propsData = {
        prop: field,
        clearable: true,
        size,
        ...getComponentsProps(schema),
        disabled: getDisable(schema),
        class: 'w-full'
      }

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder
      // RangePicker place is an array
      if (
        ['daterange', 'datetimerange'].includes(
          getComponentsProps(schema)?.type
        ) &&
        component === 'DatePicker'
      ) {
        const [startPlaceholder, endPlaceholder] = getComponentsProps(schema)?.placeholder || []
        propsData.startPlaceholder = startPlaceholder || '开始时间'
        propsData.endPlaceholder = endPlaceholder || '结束时间'
      } else if (isCreatePlaceholder && component) {
        propsData.placeholder = getComponentsProps(schema)?.placeholder || createPlaceholderMessage(component)
      }
      if (!renderComponentContent) {
        return <Comp {...propsData} v-model={state.value[schema.field]} />
      }

      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(getValues(schema)) }
        : { default: () => renderComponentContent }

      return <Comp  {...propsData} v-model={state.value[schema.field]}>{compSlot}</Comp>
    }

    return () => (
      <el-form
        {...unref(getBindValue)}
        ref={formElRef}
        model={state}
        validate-on-rule-change={false}
        require-asterisk-position="right"
        onKeyup={handleEnterPress}
      >
        <el-row {...unref(getRow)}>
          {renderFormItemWrap()}
        </el-row>
      </el-form>
    )
  }
})
</script>

<style lang="scss">

</style>
