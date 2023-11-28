<template>
  <div class="app-container">
    <schema-form auto-submit-on-enter @register="register" @enter="handelQuery">
      <template #actions>
        <div class="flex">
          <el-button>导入</el-button>
          <el-button>导出</el-button>
          <div class="flex-grow"></div>
          <div>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handelQuery">查询</el-button>
          </div>
        </div>
      </template>
    </schema-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useForm } from '@/components/SchemaForm'
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
      label: '字段4',
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

export default defineComponent({
  setup() {
    const [register, { getFieldsValue, resetFields }] = useForm({
      schemas: getSchemas()
    })

    return {
      register,
      handelQuery() {
        const data = getFieldsValue()
        console.log(data)
      },
      handleReset() {
        const data = resetFields()
        console.log(data)
      }
    }
  }
})
</script>

<style>

</style>
