<template>
  <page-wrapper>
    <vc-search
      v-model="dataForm"
      :schemas="getSearchSchemas"
      @search="onSearch"
    />
    <div class="table-container">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </page-wrapper>
</template>

<script setup>
import { ref } from 'vue'

import { createFieldHelper } from '@/enums/busEnum'
import { sleep } from '@/utils'

const dataForm = ref({})
const tableData = ref([])

const getSearchSchemas = [
  createFieldHelper('Input', { field: 'nameZh', label: 'name' }),
  createFieldHelper('Input', { field: 'a', label: 'a' }),
  createFieldHelper('Input', { field: 'b', label: 'b' }),
  createFieldHelper('Input', { field: 'c', label: 'c' }),
  createFieldHelper('Input', { field: 'd', label: 'd' }),
  createFieldHelper('Input', { field: 'e', label: 'e' }),
  createFieldHelper('Input', { field: 'f', label: 'f' }),
  createFieldHelper('Input', { field: 'g', label: 'g' }),
  createFieldHelper('Input', { field: 'h', label: 'h' }),
  createFieldHelper('Input', { field: 'i', label: 'i' }),
]

const onSearch = async () => {
  await sleep(30)
  tableData.value = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
}
</script>
