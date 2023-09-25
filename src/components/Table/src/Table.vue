<template>
  <div ref="wrapRef" class="vc-table" v-loading="loading">
    <el-table ref="tableRef" v-bind="$attrs">
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

<script>
import { defineComponent, toRefs, ref, getCurrentInstance, onMounted, computed } from 'vue'

import props from './props'

import { usePagination } from './hooks/usePagination'
import { useColumns } from './hooks/useColumns'

import { createNamespace } from '@/components/utils'

const [name] = createNamespace('table')

export default defineComponent({
  name: name,
  inheritAttrs: false,
  props: props,
  setup(props, { slots, attrs, emit, expose }) {

    const { proxy } = getCurrentInstance()

    const wrapRef = ref(null)
    const tableRef = ref(null)

    const getProps = computed(() => {
      return { ...props, ...attrs }
    })

    const { getPaginationProps } = usePagination(getProps)
    const { getViewColumns } = useColumns(getProps)

    onMounted(() => {
      const CACHE = tableRef.value ?? {}
      for (const [key, value] of Object.entries(CACHE)) {
        proxy[key] = value
      }
    })

    return {
      wrapRef,
      tableRef,
      getPaginationProps,
      getViewColumns,
    }
  }
})
</script>

<style scoped lang="scss">

</style>
