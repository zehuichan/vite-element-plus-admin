<template>
  <el-form
    v-bind="getBindValue"
    ref="formElRef"
    :model="state"
    :rules="getRules"
    :validate-on-rule-change="false"
    :label-position="labelPosition"
    :label-width="labelWidth"
    require-asterisk-position="right"
  >
    <el-row v-bind="getRow">
      <template v-for="schema in getSchema" :key="schema.field">
        <!--判断colSlot插槽-->
        <slot
          v-if="schema.colSlot"
          :name="schema.colSlot"
          v-bind="getValues(schema)"
        />
        <el-col v-else v-show="handleShow(schema)" v-bind="getColProps(schema)">
          <el-form-item :label="schema.label" :prop="schema.field">
            <!--判断slot插槽-->
            <slot
              v-if="schema.slot"
              :name="schema.slot"
              v-bind="getValues(schema)"
            />
            <!--动态渲染表单组件-->
            <component
              v-else
              v-bind="getComponentProps(schema)"
              :is="componentMap.get(schema.component)"
              v-model="state[schema.field]"
              class="!w-full"
            />
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, reactive, ref, unref, useAttrs, watch } from 'vue'

import { formProps as elFormProps } from 'element-plus'

import { cloneDeep, pick } from 'lodash-es'

import { useVModel } from '@vueuse/core'

import { dateUtil } from '@/utils/dateUtil'
import { isBoolean, isFunction, isNull, isNullOrUnDef } from '@/utils/is'

import { componentMap } from './componentMap'
import { createPlaceholderMessage, dateItemType } from './helper'

import { useAdvanced } from './hooks/useAdvanced'
import { useFormEvents } from './hooks/useFormEvents'
import { useAutoFocus } from './hooks/useAutoFocus'

import { formProps, formEmits } from './Form'
import { deepMerge } from '@/utils'
import { useComputed } from '@/hooks/web/useComputed'

const COMPONENT_NAME = 'VcForm'
defineOptions({
  name: COMPONENT_NAME,
  inheritAttrs: false,
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const attrs = useAttrs()

const { proxy } = getCurrentInstance()

const formElRef = ref(null)
const schemaRef = ref(null)
const propsRef = ref({})
const isUpdateDefaultRef = ref(false)

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

const getRules = computed(() => {
  const schemas = unref(schemaRef) || unref(getProps).schemas
  const rules = {}
  schemas.forEach((item) => {
    rules[item.field] = handleRules(item)
  })
  return rules
})

const getValues = useComputed((schema) => {
  return {
    field: schema.field,
    model: unref(state),
    schema: schema
  }
})

const getComponentProps = useComputed((schema) => {
  let { componentProps = {} } = schema
  const component = schema.component
  if (isFunction(componentProps)) {
    componentProps = componentProps({ schema, formModel: unref(state) }) ?? {}
  }
  return {
    clearable: true,
    placeholder: createPlaceholderMessage(unref(component)),
    ...componentProps
  }
})

const getDisable = useComputed((schema) => {
  const { disabled: globDisabled } = props
  const { dynamicDisabled } = schema
  const { disabled: itemDisabled = false } = getComponentProps(schema)
  let disabled = !!globDisabled || itemDisabled
  if (isBoolean(dynamicDisabled)) {
    disabled = dynamicDisabled
  }
  if (isFunction(dynamicDisabled)) {
    disabled = dynamicDisabled(unref(getValues))
  }
  return disabled
})


const { handleToggleAdvanced, fieldsIsAdvancedMap } = useAdvanced({
  advanceState,
  emit,
  getProps,
  getSchema,
  formModel: unref(state),
})

const { setSchema, addSchema, delSchema } = useFormEvents({ getProps, getSchema })

useAutoFocus({
  getSchema,
  getProps,
  isInitedDefault: isUpdateDefaultRef,
  formElRef
})

watch(
  () => getSchema.value,
  (schema) => {
    if (unref(isUpdateDefaultRef)) {
      return
    }
    if (schema?.length) {
      initDefault()
      isUpdateDefaultRef.value = true
    }
  }
)

function setProps(formProps) {
  propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
}

function getColProps(schema) {
  const { baseColProps = {} } = props
  const { colProps = {} } = schema
  const realColProps = { ...baseColProps, ...colProps }
  return realColProps
}

function handleShow(schema) {
  const { show, ifShow } = schema
  schema.isAdvanced = fieldsIsAdvancedMap[schema.field]
  const itemIsAdvanced = isBoolean(schema.isAdvanced) ? schema.isAdvanced : true

  let flag = true

  if (isBoolean(show)) {
    flag = show
  }
  if (isBoolean(ifShow)) {
    flag = ifShow
  }
  if (isFunction(show)) {
    flag = show(getValues(schema))
  }
  if (isFunction(ifShow)) {
    flag = ifShow(getValues(schema))
  }

  flag = flag && itemIsAdvanced

  return flag
}


function handleRules(schema) {
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
  const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props

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
}

//初始化默认值
function initDefault() {
  const schemas = unref(getSchema)
  schemas.forEach((item) => {
    const { defaultValue } = item
    if (!isNullOrUnDef(defaultValue)) {
      state.value[item.field] = defaultValue
    }
  })
}

const formActions = {
  advanceState,
  setProps,
  setSchema,
  addSchema,
  delSchema,
  handleToggleAdvanced
}

onMounted(() => {
  initDefault()
  emit('register', formActions)
})

defineExpose(formActions)
</script>

<style lang="scss">

</style>
