<template>
  <div class="app-container">
    <el-form-item label="配置">
      <el-button @click="setProps({ size: 'small' })">small</el-button>
      <el-button @click="setProps({ size: 'default' })">default</el-button>
      <el-button @click="setProps({ size: 'large' })">large</el-button>
      <el-button @click="setProps({ disabled: true })">禁用表单</el-button>
      <el-button @click="setProps({ disabled: false })">解除禁用</el-button>
      <el-button @click="setFieldsValue({ field1: 123123 })">
        setFieldsValue
      </el-button>
    </el-form-item>
    <schema-form ref="formRef" :schemas="schemas">
      <template #f3="{ model, field }">
        <el-input v-model="model[field]" placeholder="自定义slot" />
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent, ref, unref } from 'vue'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    defaultValue: 123,
    required: true
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field3',
    component: 'Input',
    label: '字段3',
    slot: 'f3',
    colProps: {
      span: 8
    }
  }
]

export default defineComponent({
  components: {},

  setup() {
    const formRef = ref(null)

    return {
      formRef,
      schemas,
      setProps(props) {
        unref(formRef).setProps(props)
      },
      setFieldsValue(values) {
        unref(formRef).setFieldsValue(values)
      }
    }
  }
})
</script>
