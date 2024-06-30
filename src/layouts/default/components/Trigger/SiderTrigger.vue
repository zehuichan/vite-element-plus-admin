<template>
  <div class="trigger" @click.stop="toggleCollapsed">
    <icon-park type="menu-fold-one" v-if="getCollapsed" />
    <icon-park type="menu-unfold-one" v-else />
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
