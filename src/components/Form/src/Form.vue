<template>
  <el-form
    v-bind="$attrs"
    ref="formElRef"
    :model="state"
    :validate-on-rule-change="false"
    require-asterisk-position="right"
  >
    <el-row v-bind="getRow">
      <template v-bind="schema.colProps" v-for="schema in getSchema" :key="schema.field">
        <el-col>

        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { computed, defineComponent, reactive, ref, unref } from 'vue'
import { cloneDeep, pick } from 'lodash-es'

import { useVModel } from '@vueuse/core'

import { createNamespace } from '@/components/utils'

import { dateUtil } from '@/utils/dateUtil'

import { dateItemType } from '@/components/SchemaForm/src/helper'

import formProps from './props'

const [name] = createNamespace('form')

export default defineComponent({
  name: name,
  inheritAttrs: false,
  props: formProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {

    const formElRef = ref(null)
    const innerProps = ref()

    const state = useVModel(props, 'modelValue', emit)

    const getRow = computed(() => {
      const { baseRowStyle = {}, rowProps = { gutter: 20 } } = innerProps.value?.rowProps
      return {
        style: baseRowStyle,
        ...rowProps
      }
    })

    const getSchema = computed(() => {
      const schemas = innerProps.value?.schemas
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

    return {
      state,
      getRow,
      getSchema
    }
  }
})
</script>

<style lang="scss">

</style>
