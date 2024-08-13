<template>
  <div class="pagination-container">
    <el-pagination
      v-bind="$attrs"
      background
      size="small"
      :layout="layout"
      @update:current-page="handleSizeChange"
      @update:page-size="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { scrollTo } from '@/utils/scrollTo'

import { paginationProps, paginationEmits } from './Pagination'

defineOptions({
  name: 'Pagination',
  inheritAttrs: false,
})
const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

function handleSizeChange() {
  emit('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

function handleCurrentChange() {
  emit('pagination')
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
