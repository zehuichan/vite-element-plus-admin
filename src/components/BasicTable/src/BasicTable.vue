<template>
  <div ref="wrapRef" class="basic-table">
    <el-auto-resizer>
      <template #default="{ width, height }">
        <el-table
          ref="tableElRef"
          v-bind="$attrs"
          border
          :data="data"
          :width="width"
          :min-height="height"
        >
          <slot />
          <el-table-column
            v-for="column in getViewColumns"
            v-bind="column"
          >
            <template #default="scope">
              <slot v-if="$slots[column.prop]" :name="column.prop" v-bind="scope || {}" />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-auto-resizer>
    <pagination v-bind="getPaginationProps" />
  </div>
</template>

<script>
import { computed, defineComponent, ref, unref } from 'vue'

import { useColumns } from './hooks/useColumns'

export default defineComponent({
  name: 'BasicTable',
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
  },
  setup(props, { attrs, }) {
    const tableElRef = ref(null)

    // todo
    const innerPropsRef = ref({})

    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) }
    })

    const getPaginationProps = computed(() => {
      return {
        ...attrs,
      }
    })

    const { getViewColumns } = useColumns(getProps)

    return {
      tableElRef,
      getPaginationProps,
      getViewColumns,
    }
  }
})
</script>


<style lang="scss">
.basic-table {
  padding: 8px;
  background-color: #fff;
  border-radius: 2px;
}
</style>