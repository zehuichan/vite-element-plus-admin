<template>
  <div class="vc-search">
    <div class="vc-search__content">
      <vc-form
        ref="formRef"
        v-bind="$attrs"
        :schemas="getSchemas"
        :base-col-props="baseColProps"
        auto-submit-on-enter
        @enter="handelQuery"
      />
    </div>
    <div class="vc-search__tools flex-center">
      <slot name="tools" />
      <div class="flex-grow"></div>
      <div>
        <slot name="extra" />
        <el-button @click="handelReset">重置</el-button>
        <el-button type="primary" @click="handelQuery">查询</el-button>
        <el-button v-if="!advanceState.hideAdvanceBtn" text bg @click="handleToggleAdvanced">
          <div class="mr-4px">{{ advanceState.isAdvanced ? '收起' : '展开' }}</div>
          <icon-park :name="advanceState.isAdvanced ? 'up' : 'down'" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, ref, unref } from 'vue'

import { cloneDeep } from 'lodash-es'

import { searchEmits, searchProps } from './Search'

const COMPONENT_NAME = 'VcSearch'
defineOptions({
  name: 'VcSearch',
  inheritAttrs: false,
})

const props = defineProps(searchProps)
const emit = defineEmits(searchEmits)

const BASIC_COL_LEN = 24

const vm = getCurrentInstance()

const formRef = ref(null)

const advanceState = reactive({
  isAdvanced: false,
  hideAdvanceBtn: false,
  isLoad: false,
})

const getSchemas = computed(() => {
  let itemColSum = 0
  let realItemColSum = 0
  const { schemas = [], baseColProps = {} } = props

  for (const schema of schemas) {
    const { colProps } = schema

    if (colProps || baseColProps) {
      const { itemColSum: sum, isAdvanced } = getAdvanced({ ...baseColProps, ...colProps }, itemColSum)

      itemColSum = sum || 0
      if (isAdvanced) {
        realItemColSum = itemColSum
      }
      schema.isAdvanced = isAdvanced
    }
  }

  // 确保页面发送更新
  vm?.proxy?.$forceUpdate()

  getAdvanced({ span: BASIC_COL_LEN }, itemColSum, true)

  return cloneDeep(schemas)
})

const getAdvanced = (itemCol, itemColSum = 0, isLastAction = false) => {
  const mdWidth = itemCol.span || BASIC_COL_LEN

  itemColSum += mdWidth
  if (isLastAction) {
    advanceState.hideAdvanceBtn = false
    if (itemColSum <= BASIC_COL_LEN * 2) {
      // When less than or equal to 2 lines, the collapse and expand buttons are not displayed
      advanceState.hideAdvanceBtn = true
      advanceState.isAdvanced = true
    } else if (
      itemColSum > BASIC_COL_LEN * 2 &&
      itemColSum <= BASIC_COL_LEN * (props.autoAdvancedLine || 3)
    ) {
      advanceState.hideAdvanceBtn = false
      // More than 3 lines collapsed by default
    } else if (!advanceState.isLoad) {
      advanceState.isLoad = true
    }
    return { isAdvanced: advanceState.isAdvanced, itemColSum }
  }
  if (itemColSum > BASIC_COL_LEN * (props.alwaysShowLines || 1)) {
    return { isAdvanced: advanceState.isAdvanced, itemColSum }
  } else {
    // The first line is always displayed
    return { isAdvanced: true, itemColSum }
  }
}

const handelReset = () => {
  unref(formRef).resetFields()
  emit('reset')
}

const handelQuery = () => {
  emit('search')
}

const handleToggleAdvanced = () => {
  advanceState.isAdvanced = !advanceState.isAdvanced
  emit('advanced-change')
}
</script>

<style lang="scss">
.vc-search {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 12px;
  border-radius: 4px;

  .vc-search__content {
  }

  .vc-search__tools {
  }
}
</style>
