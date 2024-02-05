<template>
  <div class="basic-layout-content">
    <fullcontent v-model="fullContent">
      <page-layout />
    </fullcontent>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'

import PageLayout from '@/layouts/page/index.vue'

import { useRootSetting } from '@/hooks/setting/useRootSetting'

export default defineComponent({
  name: 'AppContent',
  components: { PageLayout },
  setup() {
    const { setRootSetting, getFullContent } = useRootSetting()

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

    return {
      fullContent
    }
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
