<script lang="jsx">
import { computed, defineComponent, inject, unref } from 'vue'
import { cloneDeep } from 'lodash-es'

import { componentMap } from '@/components/SchemaForm/src/componentMap'

import { isBoolean, isFunction, isNull } from '@/utils/is'
import { getSlot } from '@/utils/jsxHelper'

import { formCtxKey } from './constants'

import { createNamespace } from '@/components/utils'
import { createPlaceholderMessage } from '@/components/SchemaForm/src/helper'

const [name] = createNamespace('form-item')

export default defineComponent({
  name: name,
  inheritAttrs: false,
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    isAdvanced: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    const formCtx = inject(formCtxKey, undefined)

    const getValues = computed(() => {
      const { schema } = props
      return {
        field: schema.field,
        model: formCtx.formModel,
        values: {
          ...formCtx.formModel
        },
        schema: schema
      }
    })

    const getComponentsProps = computed(() => {
      const { schema, formModel } = props
      let { componentProps = {} } = schema
      if (isFunction(componentProps)) {
        componentProps = componentProps({ schema, formModel }) ?? {}
      }
      if (schema.component === 'Divider') {
        componentProps = Object.assign(
          { direction: 'horizontal', contentPosition: 'left' },
          componentProps
        )
      }
      return componentProps
    })

    const getDisable = computed(() => {
      const { disabled: globDisabled } = formCtx
      const { dynamicDisabled } = props.schema
      const { disabled: itemDisabled = false } = unref(getComponentsProps)
      let disabled = !!globDisabled || itemDisabled
      if (isBoolean(dynamicDisabled)) {
        disabled = dynamicDisabled
      }
      if (isFunction(dynamicDisabled)) {
        disabled = dynamicDisabled(unref(getValues))
      }
      return disabled
    })

    function getShow() {
      const { show, ifShow } = props.schema
      const itemIsAdvanced = isBoolean(props.isAdvanced) ? props.isAdvanced : true

      let isShow = true
      let isIfShow = true

      if (isBoolean(show)) {
        isShow = show
      }
      if (isBoolean(ifShow)) {
        isIfShow = ifShow
      }
      if (isFunction(show)) {
        isShow = show(unref(getValues))
      }
      if (isFunction(ifShow)) {
        isIfShow = ifShow(unref(getValues))
      }

      isShow = isShow && itemIsAdvanced
      return { isShow, isIfShow }
    }

    function handleRules() {
      const {
        rules: defRules = [],
        component,
        rulesMessageJoinLabel,
        label,
        dynamicRules,
        required
      } = props.schema

      if (isFunction(dynamicRules)) {
        return dynamicRules(unref(getValues))
      }

      let rules = cloneDeep(defRules)
      const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = formCtx

      const joinLabel = Reflect.has(props.schema, 'rulesMessageJoinLabel')
        ? rulesMessageJoinLabel
        : globalRulesMessageJoinLabel
      const defaultMsg = createPlaceholderMessage(component) + `${joinLabel ? label : ''}`

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

      const getRequired = isFunction(required) ? required(unref(getValues)) : required

      /*
       * 1、若设置了required属性，又没有其他的rules，就创建一个验证规则；
       * 2、若设置了required属性，又存在其他的rules，则只rules中不存在required属性时，
       * 才添加验证required的规则也就是说rules中的required，优先级大于required
       */
      if (getRequired) {
        if (!rules || rules.length === 0) {
          rules = [{ required: getRequired, validator }]
        } else {
          const requiredIndex = rules.findIndex((rule) => Reflect.has(rule, 'required'))

          if (requiredIndex === -1) {
            rules.push({ required: getRequired, validator })
          }
        }
      }

      const requiredRuleIndex = rules.findIndex(
        (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
      )

      if (requiredRuleIndex !== -1) {
        const rule = rules[requiredRuleIndex]
        const { isShow } = getShow()
        if (!isShow) {
          rule.required = false
        }
      }

      // Maximum input length rule check
      const characterInx = rules.findIndex((val) => val.max)
      if (characterInx !== -1 && !rules[characterInx].validator) {
        rules[characterInx].message =
          rules[characterInx].message ||
          `字符数应小于${[rules[characterInx].max]}位`
      }
      return rules
    }

    function renderLabel() {
      const { field, label } = props.schema
      if (slots[`form-${field}-label`]) {
        return slots[`form-${field}-label`]()
      }
      return label
    }

    const renderComponent = () => {
      const { renderComponentContent, component, field, label } = props.schema

      if (!componentMap.has(component)) {
        return null
      }

      const Comp = componentMap.get(component)

      const on = {
        ['onUpdate:modelValue']: (value) => {
          formCtx.formModel[field] = value
        }
      }

      const { autoSetPlaceHolder, size } = formCtx || {}
      const propsData = {
        prop: field,
        clearable: true,
        size,
        ...unref(getComponentsProps),
        disabled: unref(getDisable),
        style: { width: '100%' }
      }

      if (
        ['daterange', 'datetimerange'].includes(
          unref(getComponentsProps)?.type
        ) &&
        component === 'DatePicker'
      ) {
        const [startPlaceholder, endPlaceholder] = unref(getComponentsProps)?.placeholder || []
        propsData.startPlaceholder = startPlaceholder || '开始时间'
        propsData.endPlaceholder = endPlaceholder || '结束时间'
      } else {
        propsData.placeholder = unref(getComponentsProps)?.placeholder || label
      }
      propsData.codeField = field
      propsData.formValues = unref(getValues)

      const bindValue = {
        modelValue: formCtx.formModel[field]
      }

      const compAttr = {
        ...propsData,
        ...on,
        ...bindValue
      }

      if (!renderComponentContent) {
        return <Comp {...compAttr}></Comp>
      }

      const compSlot = isFunction(renderComponentContent)
        ? { ...renderComponentContent(unref(getValues), { disabled: unref(getDisable) }) }
        : { default: () => renderComponentContent }

      return <Comp {...compAttr}>{compSlot}</Comp>
    }

    const renderItem = (schema) => {
      const { itemProps, slot, render, field, label, component } = props.schema
      const opts = { disabled: unref(getDisable) }

      if (component === 'Divider') {
        return (
          <el-col span={24}>
            <el-divider {...unref(getComponentsProps)}>{label}</el-divider>
          </el-col>
        )
      } else {
        const getContent = () => {
          return slot
            ? getSlot(slots, slot, unref(getValues), opts)
            : render
              ? render(unref(getValues), opts)
              : renderComponent(schema)
        }

        // todo https://vuejs.org/guide/extras/render-function.html#passing-slots
        return (
          <el-form-item prop={field} rules={handleRules()} {...itemProps}>
            {{
              label: () => renderLabel(),
              default: () => getContent()
            }}
          </el-form-item>
        )
      }
    }

    return () => {
      const { colProps = {}, colSlot, renderColContent, component } = props.schema
      if (!componentMap.has(component)) {
        return null
      }

      const { baseColProps = {} } = formCtx || {}
      const realColProps = { ...baseColProps, ...colProps }
      const { isIfShow, isShow } = getShow()
      const values = unref(getValues)
      const opts = { disabled: unref(getDisable) }

      const getContent = () => {
        return colSlot
          ? getSlot(slots, colSlot, values, opts)
          : renderColContent
            ? renderColContent(values, opts)
            : renderItem()
      }

      return isIfShow && (
        <el-col {...realColProps} v-show={isShow}>
          {getContent()}
        </el-col>
      )
    }
  }
})
</script>

<style lang="scss">

</style>
