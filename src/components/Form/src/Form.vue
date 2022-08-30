<template>
  <el-form
    ref="formElRef"
    :model="formModel"
    :label-position="labelPosition"
    :label-width="labelWidth"
    v-bind="getBindValue"
    @keypress.enter="handleEnterPress"
  >
    <el-row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <v-form-item
          :schema="schema"
          :form-props="getProps"
          :all-default-values="defaultValueRef"
          :form-model="formModel"
          v-model="formModel[schema.field]"
        >
          <template v-for="item in Object.keys($slots)" #[item]="data">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </v-form-item>
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

import { useFormValues } from './hooks/useFormValues'
import { useFormEvents } from './hooks/useFormEvents'

import { deepMerge } from '@/utils'

import VFormItem from './components/VFormItem.vue'

export default defineComponent({
  name: 'VForm',
  components: {
    VFormItem
  },
  inheritAttrs: false,
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
      default: '80px'
    },
    // 表单配置规则
    schemas: {
      type: [Array],
      default: () => []
    },
    size: String,
    disabled: Boolean,
    autoSubmitOnEnter: {
      type: Boolean,
      default: false
    },
    autoSetPlaceHolder: {
      type: Boolean,
      default: true
    }
  },
  emits: ['register', 'input', 'field-value-change'],
  setup(props, { attrs, emit }) {
    const formModel = reactive({ ...props.modelValue })

    const defaultValueRef = ref({})
    const propsRef = ref({})
    const schemaRef = ref(null)
    const formElRef = ref(null)

    const getProps = computed(() => {
      return { ...props, ...unref(propsRef) }
    })
    // Get uniform row style and Row configuration for the entire form
    const getRow = computed(() => {
      const { baseRowStyle = {}, rowProps } = unref(getProps)
      return {
        style: baseRowStyle,
        ...rowProps
      }
    })
    const getBindValue = computed(() => {
      return { ...attrs, ...props, ...unref(getProps) }
    })

    const getSchema = computed(() => {
      return unref(schemaRef) || unref(getProps).schemas
    })

    const { initDefault } = useFormValues({
      defaultValueRef,
      getSchema,
      formModel
    })

    const {
      validate,
      resetFields,
      clearValidate,
      scrollToField,
      validateField
    } = useFormEvents({
      getProps,
      formModel,
      getSchema,
      defaultValueRef,
      formElRef,
      schemaRef
    })

    async function setProps(formProps) {
      propsRef.value = deepMerge(unref(propsRef) || {}, formProps)
    }

    function setFormModel(key, value) {
      formModel[key] = value
      emit('field-value-change', key, value)
    }

    watch(
      () => formModel,
      () => {
        emit('input', formModel)
      },
      { immediate: true, deep: true }
    )

    const formAction = {
      setProps,
      validate,
      resetFields,
      clearValidate,
      scrollToField,
      validateField
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
      getSchema,
      getRow,
      getProps,
      formElRef,
      formAction,
      setFormModel,

      handleEnterPress,
      ...formAction
    }
  }
})
</script>
