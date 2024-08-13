<template>
  <div ref="wrapRef" class="vc-table" v-loading="loading" element-loading-text="loading...">
    <component
      ref="tableRef"
      border
      show-overflow-tooltip
      :is="h(ElTable, $attrs, $slots)"
    >

    </component>
  </div>
</template>

<script setup>
import { provide, reactive, ref, toRefs, h } from 'vue'

import { ElTable } from 'element-plus'

import { tableEmits, tableProps } from './Table'
import { tableContextKey } from './constants'

const COMPONENT_NAME = 'VcTableV2'
defineOptions({
  name: 'VcTableV2',
  inheritAttrs: false,
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const reactData = reactive({

})
const internalData = {
  isActivated: false
}

const wrapRef = ref()
const tableRef = ref()

provide(
  tableContextKey,
  reactive({
    ...toRefs(props),
    emit,

    internalData
  })
)

defineExpose({ tableRef })
</script>

<style lang="scss">
.vc-table {
  .cell--selected {
    box-shadow: inset 0 0 0 2px var(--el-color-primary);
  }

  .highlight-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-7);
  }

  .histroy-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
}
</style>
