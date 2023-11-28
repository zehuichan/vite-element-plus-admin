<template>
  <div ref="wrapRef" class="vc-table" v-loading="loading">
    <el-table ref="tableRef" v-bind="$attrs" border stripe>
      <slot />
      <el-table-column v-for="column in getViewColumns" v-bind="column">
        <template #default="scope">
          <slot v-if="$slots[column.prop]" :name="column.prop" v-bind="scope || {}" />
        </template>
      </el-table-column>
      <template #[item]="data" v-for="item in ['append', 'empty']">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </el-table>
    <pagination
      v-if="pagination"
      v-bind="getPaginationProps"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, useAttrs, } from 'vue'

import { tableProps } from './Table'

import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'

const COMPONENT_NAME = 'VcTable'
defineOptions({
  name: COMPONENT_NAME,
  inheritAttrs: false,
})

const props = defineProps(tableProps)
const attrs = useAttrs()

const wrapRef = ref(null)
const tableRef = ref(null)

const getProps = computed(() => {
  return { ...props, ...attrs }
})

const { getPaginationProps } = usePagination(getProps)
const { getViewColumns } = useColumns(getProps)

const tableActions = {}

onMounted(() => {
  
})

defineExpose(tableActions)
</script>

<style scoped lang="scss">

</style>
