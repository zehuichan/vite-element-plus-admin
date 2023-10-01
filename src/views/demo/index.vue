<template>
  <div class="app-container">
    {{ dataForm }}
    <vc-form
      ref="formEl"
      v-model="dataForm"
      :schemas="schemas"
    >
      <template #f3="ctx">
        {{ ctx.modelValue }}
      </template>
      <template #field5="ctx">
        {{ ctx }}
      </template>
    </vc-form>
    <tool-bar justify="end">
      <el-button type="primary" @click="submit">保存</el-button>
    </tool-bar>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { dictApi } from '@/api'
import { sleep } from '@/utils'

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
    field: 'field4',
    component: 'ApiSelect',
    label: '字段4',
    componentProps: {
      api: dictApi,
      params: 123,
      resultField: 'list',
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id'
    }
  },
  {
    field: 'field5',
    component: 'Input',
    label: '字段5',
    required: true,
    ifShow({ values }) {
      return values.field1 == ''
    },
  },
]
const formEl = ref(null)
const dataForm = reactive({})

const submit = () => {
  formEl.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(async () => {
  await sleep(3000)
  dataForm.field1 = ''
  dataForm.field2 = 123
  dataForm.field3 = 456
})
</script>
