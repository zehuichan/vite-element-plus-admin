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

<script>
import { defineComponent } from 'vue'
import { scrollTo } from '@/utils/scrollTo'

import props from './props'

export default defineComponent({
  name: 'Pagination',
  inheritAttrs: false,
  props: props,
  emits: ['pagination'],
  setup(props, { emit }) {

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

    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
