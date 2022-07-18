<template>
  <div class="trigger tap-active" @click="trigger">
    <el-icon :size="16" v-if="opened">
      <Expand />
    </el-icon>
    <el-icon :size="16" v-if="!opened">
      <fold />
    </el-icon>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'Trigger',
  setup() {
    const opened = ref(true)

    const trigger = () => {
      opened.value = !opened.value
    }

    return {
      opened,
      trigger
    }
  },
  components: {
    Expand,
    Fold
  }
})
</script>

<style>
.trigger {
  display: flex;
  align-items: center;
  padding: 8px;
  height: 48px;
  box-sizing: border-box;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
}
</style>
