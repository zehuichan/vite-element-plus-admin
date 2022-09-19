<template>
  <div class="app-container">
    <schema-form ref="formRef" :schemas="schemas" auto-submit-on-enter>
      <template #actions>
        <div style="display: flex">
          <el-button>导入</el-button>
          <el-button>导出</el-button>
          <div class="flex-grow"></div>
          <div>
            <el-button>重置</el-button>
            <el-button type="primary">查询</el-button>
          </div>
        </div>
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
    colProps: {
      span: 8
    }
  },
  {
    field: 'actions',
    colSlot: 'actions'
  }
]

export default defineComponent({
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

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
