<template>
  <div class="app-container">
    <vc-form v-model="dataForm" @register="register">
      <template #add="{ field }">
        <el-button v-if="Number(field) === 0" text icon="Plus" @click="add" />
        <el-button v-if="field > 0" text icon="Minus" @click="del(field)" />
      </template>
    </vc-form>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import { useForm } from '@/components/Form'

const schemas = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    defaultValue: 123,
    required: true,
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
  },
  {
    field: '0',
    component: 'Input',
    colSlot: 'add',
  }
]
const [register, { appendSchemaByField, removeSchemaByField }] = useForm({
  schemas: schemas,
  baseColProps: { span: 8 }
})
const n = ref(1)
const dataForm = ref({})

function add() {
  appendSchemaByField({
    field: `field${n.value}a`,
    component: 'Input',
    label: '字段' + n.value,
    required: true,
    colProps: { span: 8 }
  })
  appendSchemaByField({
    field: `field${n.value}b`,
    component: 'Input',
    label: '字段' + n.value,
    required: true,
    colProps: { span: 8 }
  })
  appendSchemaByField({
    field: `${n.value}`,
    component: 'Input',
    colSlot: 'add',
    colProps: { span: 8 }
  })
  n.value++
}

function del(field) {
  console.log(field)
  removeSchemaByField([`field${field}a`, `field${field}b`, `${field}`])
  n.value--
}
</script>
