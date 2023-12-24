<template>
  <div class="m-12px">
    <vc-search v-model="dataForm" :schemas="schemas"></vc-search>
    <UseAdaptive class="bg-#fff p-12px" v-slot="{height}">
      {{height}}
      <vc-table adaptive :columns="columns" :data="tableData" />
    </UseAdaptive>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import VcSearch from '@/components/Search/src/Search.vue'
import VcTable from '@/components/Table/src/Table.vue'
import { UseAdaptive } from '@/hooks/web/useAdaptive'


const schemas = [
  { label: '姓名', field: 'name', component: 'Input' },
  { label: 'ID', field: 'id', component: 'Input' },
  { label: '地址', field: 'address', component: 'Input' },
  { label: '电话', field: 'phone', component: 'Input' },
  { label: '创建时间', field: 'createTime', component: 'Input' },
  { label: '更新时间', field: 'updateTime', component: 'Input' },
  { label: '创建人', field: 'createUser', component: 'Input' },
  { label: '更新人', field: 'updateUser', component: 'Input' },
  { label: '是否删除', field: 'isDelete', component: 'Input' },
  { label: '备注', field: 'remark', component: 'Input' },
  { label: '是否锁定', field: 'isLock', component: 'Input' }
]
const columns = [
  { label: 'ID', prop: 'id' },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
  { label: '电话', prop: 'phone' },
]

const dataForm = ref({})
const tableData = ref([
  { name: '1', id: 1, address: 'address', phone: 'phone' },
  { name: '2', id: 2, address: 'address', phone: 'phone' },
  { name: '3', id: 3, address: 'address', phone: 'phone' },
  { name: '4', id: 4, address: 'address', phone: 'phone' },
  { name: '5', id: 5, address: 'address', phone: 'phone' },
  { name: '6', id: 6, address: 'address', phone: 'phone' },
  { name: '7', id: 7, address: 'address', phone: 'phone' },
  { name: '8', id: 8, address: 'address', phone: 'phone' },
  { name: '9', id: 9, address: 'address', phone: 'phone' },
  { name: '10', id: 10, address: 'address', phone: 'phone' },
  { name: '11', id: 11, address: 'address', phone: 'phone' },
  { name: '12', id: 12, address: 'address', phone: 'phone' },
  { name: '13', id: 13, address: 'address', phone: 'phone' },
  { name: '14', id: 14, address: 'address', phone: 'phone' },
  { name: '15', id: 15, address: 'address', phone: 'phone' },
  { name: '16', id: 16, address: 'address', phone: 'phone' },
  { name: '17', id: 17, address: 'address', phone: 'phone' },
  { name: '18', id: 18, address: 'address', phone: 'phone' },
  { name: '19', id: 19, address: 'address', phone: 'phone' },
  { name: '20', id: 20, address: 'address', phone: 'phone' },
  { name: '21', id: 21, address: 'address', phone: 'phone' },
  { name: '22', id: 22, address: 'address', phone: 'phone' },
  { name: '23', id: 23, address: 'address', phone: 'phone' },
  { name: '24', id: 24, address: 'address', phone: 'phone' },
  { name: '25', id: 25, address: 'address', phone: 'phone' },
  { name: '26', id: 26, address: 'address', phone: 'phone' },
  { name: '27', id: 27, address: 'address', phone: 'phone' },
  { name: '28', id: 28, address: 'address', phone: 'phone' },
  { name: '29', id: 29, address: 'address', phone: 'phone' },
  { name: '30', id: 30, address: 'address', phone: 'phone' },
  { name: '31', id: 31, address: 'address', phone: 'phone' },
])
</script>
