<template>
  <div class="app-container">
    <vc-form v-model="dataForm" @register="register">
      <template #add="scope">
        <el-button text icon="Plus" @click="add" />
        <el-button text icon="Minus" @click="del()" />
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
    required: true
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
  },
  {
    field: '0',
    component: 'Input',
    slot: 'add'
  }
]
const [register, { addSchema, delSchema }] = useForm({
  schemas,
  baseColProps: { span: 8 }
})
const n = ref(1)
const dataForm = ref({})

function add() {
  addSchema({
    field: `field${n.value}a`,
    component: 'Input',
    label: '字段' + n.value,
    required: true,
  })
  addSchema({
    field: `field${n.value}b`,
    component: 'Input',
    label: '字段' + n.value,
    required: true,
  })
  addSchema({
    field: `${n.value}`,
    component: 'Input',
    colSlot: 'add',
  })
  n.value++
}

function del(field) {
  console.log(field)
  delSchema([`field${field}a`, `field${field}b`, `${field}`])
  n.value--
}
</script>
