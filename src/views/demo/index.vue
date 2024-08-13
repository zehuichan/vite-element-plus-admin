<template>
  <page-wrapper>
    <div class="table-wrapper">
      <vc-table-v2
        ref="tableRef"
        table-key="0"
        :data="tableData"
        @cell-click="onCellClick"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="Address" />
      </vc-table-v2>
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

const onCellClick = (row, column, cell, event) => {
  console.log('=>(index.vue:55) tableRef.value', tableRef.value)
}
</script>

<style lang="scss">
</style>
