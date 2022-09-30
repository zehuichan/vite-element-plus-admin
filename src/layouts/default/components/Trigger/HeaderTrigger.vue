<template>
  <div class="trigger" @click="toggleCollapsed">
    <icon name="Expand" v-if="getCollapsed" />
    <icon name="Fold" v-else />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'HeaderTrigger',
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting()

    return { getCollapsed, toggleCollapsed }
  }
})
</script>
