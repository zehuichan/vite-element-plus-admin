<template>
  <div class="app-container">
    <el-form-item label="配置">
      <el-button @click="setProps({ size: 'small' })">small</el-button>
      <el-button @click="setProps({ size: 'default' })">default</el-button>
      <el-button @click="setProps({ size: 'large' })">large</el-button>
      <el-button @click="setProps({ disabled: true })">禁用表单</el-button>
      <el-button @click="setProps({ disabled: false })">解除禁用</el-button>
      <el-button @click="setFieldsValue({ field1: 123123 })">setFieldsValue</el-button>
      <el-button @click="handleActions('updateSchema')">updateSchema</el-button>
      <el-button @click="handleChange">handleChange</el-button>
    </el-form-item>
    <vc-form v-model="dataForm" :schemas="schemas" @register="register">
      <template #f3="scope">
        <el-input v-model="dataForm.field3" placeholder="自定义slot" />
      </template>
    </vc-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { dictApi } from '@/api'
import { useForm } from '@/components/Form'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    defaultValue: 123,
    required: true
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
  },
  {
    field: 'field3',
    component: 'Input',
    label: '字段3',
    slot: 'f3',
  },
  {
    field: 'field34',
    component: 'ApiSelect',
    label: 'ApiSelect',
    componentProps: {
      api: dictApi,
      params: 'abc',
      resultField: 'list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id'
    },
    defaultValue: '1',
    required: true
  },
  {
    field: 'field35',
    component: 'ApiSelect',
    label: '本地下拉选择',
    componentProps: {
      options: [
        { label: '黄金糕', value: 1 },
        { label: '双皮奶', value: 2 },
        { label: '蚵仔煎', value: 3 },
        { label: '龙须面', value: 4 },
        { label: '北京烤鸭', value: 5 }
      ]
    },
  }
]

const dataForm = ref({})
const [register, { setProps, updateSchema }] = useForm()

const handleActions = (type) => {
  switch (type) {
    case 'updateSchema':
      updateSchema([
        {
          field: 'field2',
          component: 'ApiSelect',
          label: '字段2',
          componentProps: {
            options: [
              { label: '黄金糕', value: 1 },
              { label: '双皮奶', value: 2 },
              { label: '蚵仔煎', value: 3 },
              { label: '龙须面', value: 4 },
              { label: '北京烤鸭', value: 5 }
            ]
          },
        },
      ])
      break
  }
}

function handleChange() {
  dataForm.value = { field2: 123123 }
}

const setFieldsValue = (obj) => {
  dataForm.value = obj
}
</script>
