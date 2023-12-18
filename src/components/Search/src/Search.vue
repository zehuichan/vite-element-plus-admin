<template>
  <div class="vc-search">
    <div class="vc-search__content">
      <vc-form
        ref="formRef"
        v-bind="$attrs"
        auto-submit-on-enter
        show-advanced-button
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
import { computed, ref, unref } from 'vue'

import { searchEmits, searchProps } from './Search'

const COMPONENT_NAME = 'VcSearch'
defineOptions({
  name: COMPONENT_NAME,
  inheritAttrs: false,
})

const props = defineProps(searchProps)
const emit = defineEmits(searchEmits)

const formRef = ref(null)

const advanceState = computed(() => unref(formRef)?.advanceState || {})

const handelReset = () => {
  unref(formRef).resetFields()
  emit('reset')
}

const handelQuery = () => {
  emit('search')
}

const handleToggleAdvanced = () => {
  unref(formRef).handleToggleAdvanced()
}
</script>

<style lang="scss">
.vc-search {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 12px;
  border-radius: 2px;

  .vc-search__content {
  }

  .vc-search__tools {
  }
}
</style>
