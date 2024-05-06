<template>
  <div class="app-container">
    <vc-form v-if="show" ref="formRef" v-model="dataForm" :schemas="schemas" :baseColProps="{span: 8}">

    </vc-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { dictApi } from '@/api'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    required: true
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'field3',
    component: 'Input',
    label: '字段3',
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
  }
]

const show = ref(false)
const formRef = ref(null)
const dataForm = ref({})

onMounted(() => {
  console.log(formRef)
  setTimeout(() => {
    show.value = true
    dataForm.value = {}
  }, 300)
})
</script>
