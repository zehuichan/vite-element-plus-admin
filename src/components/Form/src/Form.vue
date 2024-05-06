<script lang="jsx">
import { computed, defineComponent, ref, unref, onMounted, watch } from 'vue'

import { formProps as elFormProps } from 'element-plus'

import { cloneDeep, pick } from 'lodash-unified'

import { useVModel } from '@vueuse/core'

import { dateUtil } from '@/utils/dateUtil'
import { isBoolean, isFunction, isNull } from '@/utils/is'
import { deepMerge } from '@/utils'
import { getSlot } from '@/utils/jsxHelper'

import { componentMap } from './componentMap'
import { createPlaceholderMessage, dateItemType } from './helper'

import { useFormEvents } from './hooks/useFormEvents'
import { useAutoFocus } from './hooks/useAutoFocus'
import { useFormValues } from './hooks/useFormValues'

import { useComputed } from '@/hooks/web/useComputed'
import { useExpose } from '@/hooks/core/useExpose'

import { formProps, formEmits } from './Form'

const COMPONENT_NAME = 'VcForm'
export default defineComponent({
  name: 'VcForm',
  inheritAttrs: false,
  props: formProps,
  emits: formEmits,
  setup(props, { attrs, emit, slots, expose }) {
    const defaultValueRef = ref({})
    const isInitedDefaultRef = ref(false)
    const propsRef = ref({})
    const schemaRef = ref(null)
    const formElRef = ref(null)

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

    const { handleFormValues, initDefault } = useFormValues({
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
        values: unref(state),
        schema: schema,
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

    const getReadonly = useComputed((schema) => {
      const { disabled: globReadonly } = props
      const { dynamicReadonly } = schema
      const { readonly: itemReadonly = false } = getComponentsProps(schema)
      let readonly = globReadonly || itemReadonly
      if (isBoolean(dynamicReadonly)) {
        readonly = dynamicReadonly
      }
      if (isFunction(dynamicReadonly)) {
        readonly = dynamicReadonly(getValues(schema))
      }
      return readonly
    })

    const getFormRules = useComputed((schema) => {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required
      } = schema

      if (isFunction(dynamicRules)) {
        return dynamicRules(getValues(schema))
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
        ? required(getValues(schema))
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
          <el-form-item {...itemProps} label={label} prop={field} rules={getFormRules(schema)}>
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
        class: 'w-full',
      }

      const isCreatePlaceholder = !propsData.disabled && autoSetPlaceHolder
      // RangePicker place is an array
      if (
        ['daterange', 'datetimerange'].includes(getComponentsProps(schema)?.type) &&
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
        class="vc-form"
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
.vc-form {
  overflow: hidden;
}

.pv-form {
  overflow: hidden;
}
</style>
