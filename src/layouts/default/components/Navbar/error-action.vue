<template>
  <div class="basic-layout-navbar-action__item">
    <el-badge
      :value="getCount"
      :hidden="!getCount"
      style="display: inline-flex"
    >
      <icon name="Warning" />
    </el-badge>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useErrorLogStore } from '@/store/modules/errorLog'

export default defineComponent({
  name: 'ErrorAction',
  setup() {
    const errorLogStore = useErrorLogStore()

    const getCount = computed(() => errorLogStore.getErrorLogListCount)

    return {
      getCount
    }
  }
})
</script>
