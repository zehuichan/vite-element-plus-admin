<template>
  <div class="w-full h-full flex items-center justify-center text-primary">
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { usePermissionStore } from '@/store/modules/permission'

import { useGo } from '@/hooks/web/usePage'

export default defineComponent({
  name: 'BeforeEnter',
  setup() {
    const permissionStore = usePermissionStore()

    const go = useGo()

    go(permissionStore.getBackMenuList[0].children[0].path, true)
  }
})
</script>
