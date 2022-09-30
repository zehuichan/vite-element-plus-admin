<template>
  <div class="trigger" @click.stop="toggleCollapsed">
    <icon name="Expand" v-if="getCollapsed" />
    <icon name="Fold" v-else />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  name: 'SiderTrigger',
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting()

    return { getCollapsed, toggleCollapsed }
  }
})
</script>
