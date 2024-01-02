<template>
  <div class="m-12px">
    <div class="bg-#fff p-12px">
      <vc-table
        ref="tableRef"
        :columns="columns"
        :data="tableData"
        @cell-click="handleCellClick"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import VcTable from '@/components/Table/src/Table.vue'
import { useContextmenu } from '@/hooks/web/useContextmenu'

const columns = [
  { label: 'date', prop: 'date' },
  { label: 'name', prop: 'name' },
  { label: 'address', prop: 'address' },
]
const tableRef = ref(null)
const tableData = ref([
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
])
const [createContextmenu] = useContextmenu()
const handleCellClick = (row, column, cell, event) => {
  if (column.label === 'name') {
    const items = [
      {
        text: '订单号', handler() {
        }
      },
      {
        text: '拼箱单号', handler() {
        }
      },
      {
        text: '工作单号', handler() {
        }
      },
      {
        text: '转运单', handler() {
        }
      },
    ]
    createContextmenu({ event: event, items })
  }
}
</script>
