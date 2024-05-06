<template>
  <div class="vc-search">
    <div class="vc-search__content">
      <vc-form
        ref="formRef"
        v-bind="$attrs"
        :schemas="getSchemas"
        label-position="left"
        label-width="auto"
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
        <el-button text bg v-if="schemas.length > threshold" @click="handleToggleAdvanced">
          {{ advanceState.isAdvanced ? '收起' : '展开' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, unref } from 'vue'

import { cloneDeep } from 'lodash-unified'

import { searchEmits, searchProps } from './Search'

const COMPONENT_NAME = 'VcSearch'
defineOptions({
  name: 'VcSearch',
  inheritAttrs: false,
})

const props = defineProps(searchProps)
const emit = defineEmits(searchEmits)

const formRef = ref(null)

const advanceState = reactive({
  isAdvanced: false,
  hideAdvanceBtn: false,
  isLoad: false,
})

const getSchemas = computed(() => {
  const data = cloneDeep(props.schemas)
  if (!advanceState.isAdvanced) {
    return data.slice(0, props.threshold)
  } else {
    return data
  }
})

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
