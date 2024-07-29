<template>
  <div class="basic-layout-content" v-loading="getPageLoading" element-loading-text="loading...">
    <fullcontent v-model="fullContent">
      <page-layout />
    </fullcontent>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import PageLayout from '@/layouts/page/index.vue'

import { useRootSetting } from '@/hooks/setting/useRootSetting'

const { setRootSetting, getPageLoading, getFullContent } = useRootSetting()

const fullContent = computed({
  get() {
    return getFullContent.value
  },
  set(val) {
    setRootSetting({
      fullContent: val
    })
  }
})
</script>

<style lang="scss">
.basic-layout-content {
  position: relative;
  width: 100%;
  min-height: 0;
  padding: 0 10px;
}
</style>
