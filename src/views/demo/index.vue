<template>
  <page-wrapper>
    <div class="table-wrapper">
      <vc-table
        ref="tableRef"
        adaptive
        highlight-current-row
        :loading="loading"
        :columns="columns"
        :data="data"
        :total="data.length"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
        @row-contextmenu="(row, column, event) => createDropdown({ row, event })"
        @contextmenu.prevent.stop
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
      </vc-table>
    </div>
    <dropdown v-model:show="dropdownRef.show" :axis="dropdownRef.axis">
      <dropdown-item>
        123
      </dropdown-item>
    </dropdown>
  </page-wrapper>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'

import { useSelection } from '@/components/Table'
import { useDropdown } from '@/hooks/web/useDropdown'

import { sleep } from '@/utils'

defineOptions({ name: 'Demo' })

const columns = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age' },
  { label: '地址', prop: 'address' }
]

const tableRef = ref()
const loading = ref(false)
const data = ref([])

const queryParams = reactive({
  pageNum: 1,
  pageSize: 30,
})

const { currentRef, selectionRef, selectionIds, handleCurrentChange, handleSelectionChange } = useSelection(tableRef)
const { dropdownRef, createDropdown } = useDropdown()

onMounted(async () => {
  loading.value = true
  await sleep(250)
  data.value = [
    { name: '张三', age: 18, address: '北京', id: 1 },
    { name: '李四', age: 20, address: '上海', id: 2 },
    { name: '王五', age: 22, address: '广州', id: 3 },
    { name: '赵六', age: 24, address: '深圳', id: 4 },
    { name: '孙七', age: 26, address: '杭州', id: 5 },
    { name: '周八', age: 28, address: '南京', id: 6 },
    { name: '吴九', age: 30, address: '苏州', id: 7 },
    { name: '郑十', age: 32, address: '成都', id: 8 },
    { name: '钱十一', age: 34, address: '重庆', id: 9 },
    { name: '马十二', age: 36, address: '武汉', id: 10 },
    { name: '朱十三', age: 38, address: '郑州', id: 11 },
    { name: '陈十四', age: 40, address: '西安', id: 12 },
    { name: '梁十五', age: 42, address: '长沙', id: 13 },
    { name: '黄十六', age: 44, address: '南昌', id: 14 },
    { name: '张十七', age: 46, address: '福州', id: 15 },
    { name: '李十八', age: 48, address: '厦门', id: 16 },
    { name: '王十九', age: 50, address: '青岛', id: 17 },
    { name: '赵二十', age: 52, address: '济南', id: 18 },
    { name: '孙二十一', age: 54, address: '石家庄', id: 19 },
    { name: '周二十二', age: 56, address: '太原', id: 20 },
    { name: '吴二十三', age: 58, address: '呼和浩特', id: 21 },
  ]
  loading.value = false
})
</script>
