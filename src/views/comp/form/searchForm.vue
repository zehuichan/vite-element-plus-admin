<template>
  <div class="app-container">
    <vc-search v-model="queryParams" :schemas="getSchemas()" @reset="handleReset" @search="handelQuery">

    </vc-search>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { dictApi } from '@/api'

const dictApiMap = {
  api: dictApi,
  params: 123,
  resultField: 'list',
  // use name as label
  labelField: 'name',
  // use id as value
  valueField: 'id'
}

const getSchemas = () => {
  return [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8
      }
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
      colProps: {
        span: 8
      }
    },
    {
      field: 'field4',
      component: 'ApiSelect',
      label: '字段4',
      colProps: {
        span: 8
      },
      componentProps: dictApiMap
    },
    {
      field: 'field5',
      component: 'ApiSelect',
      label: '字段5',
      colProps: {
        span: 8
      },
      componentProps: dictApiMap
    },
    {
      field: 'actions',
      colSlot: 'actions',
      colProps: {
        span: 24
      }
    }
  ]
}

const queryParams = reactive({})

const handelQuery = () => {
  console.log('handelQuery')
}

const handleReset = () => {
  console.log('handleReset')
}
</script>

<style>

</style>
