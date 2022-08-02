<template>
  <el-menu
    mode="vertical"
    :default-active="defaultActive"
    :collapse="getCollapsed"
    :background-color="getMenuBackgroundColor"
    :text-color="getMenuTextColor"
    :active-text-color="getMenuActiveTextColor"
    @select="onSelect"
  >
    <template v-for="route in routes" :key="route.path">
      <menu-item :item="route" />
    </template>
  </el-menu>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'

import MenuItem from './item.vue'

import { isUrl } from '@/utils/is'
import { useGo } from '@/hooks/web/usePage'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

export default defineComponent({
  components: {
    MenuItem
  },
  props: {
    routes: Array,
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    collapse: Boolean,
    collapseTransition: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const {
      getCollapsed,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor
    } = useMenuSetting()
    const { currentRoute } = useRouter()
    const { push } = useGo()

    const defaultActive = computed(() => {
      const { meta, path } = unref(currentRoute)
      // if set path, the sidebar will highlight the path you set
      if (meta.currentActiveMenu) {
        return meta.currentActiveMenu
      }
      return path
    })

    const onSelect = (index) => {
      if (isUrl(index)) {
        window.open(index)
      } else {
        push(index)
      }
    }

    return {
      getCollapsed,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,

      defaultActive,
      onSelect
    }
  }
})
</script>
