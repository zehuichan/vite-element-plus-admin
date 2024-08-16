<template>
  <page-wrapper>
    <div class="table-wrapper">
      <vc-table
        ref="tableRef"
        :data="tableData"
        keyboard
        selected
        :pagination="false"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="55" label="序号" />
        <el-table-column prop="date" label="Date">
          <template #default="scope">
            <el-input v-model="scope.row.date" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name">
          <template #default="scope">
            <el-input v-model="scope.row.name" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Address">
          <template #default="scope">
            <el-input v-model="scope.row.address" />
          </template>
        </el-table-column>
        <el-table-column prop="select" label="Select">
          <template #default="scope">
            <el-select
              v-model="scope.row.select"
              placeholder="Select"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
      </vc-table>
    </div>
    <template #footer>
      123
    </template>
  </page-wrapper>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'

import { useSelection } from '@/components/Table'
import { useDropdown } from '@/hooks/web/useDropdown'

defineOptions({
  name: 'Demo'
})

const tableRef = ref()
const tableData = reactive([
  { id: '1', date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { id: '2', date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { id: '3', date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { id: '4', date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
])
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const onCellClick = (row, column, cell, event) => {
  console.log('=>(index.vue:55) tableRef.value', tableRef.value)
}
</script>

<style lang="scss">
</style>
