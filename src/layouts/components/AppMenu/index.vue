<template>
  <el-menu
    mode="vertical"
    :default-active="defaultActive"
    :collapse="collapse"
    :unique-opened="getAccordion"
    :background-color="getMenuBackgroundColor"
    :text-color="getMenuTextColor"
    :active-text-color="getMenuActiveTextColor"
    :collapse-transition="false"
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
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppInjectStore } from '@/hooks/web/useAppProvideStore'

export default defineComponent({
  name: 'AppMenu',
  components: {
    MenuItem
  },
  props: {
    routes: Array,
    uniqueOpened: Boolean
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { getIsMobile } = useAppInjectStore()

    const {
      getCollapsed,
      getAccordion,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,
      getMenuWidth
    } = useMenuSetting()

    const { push, currentRoute } = useRouter()

    const defaultActive = computed(() => {
      const { meta, path } = unref(currentRoute)
      // if set path, the sidebar will highlight the path you set
      if (meta.currentActiveMenu) {
        return meta.currentActiveMenu
      }
      return path
    })

    const collapse = computed(() => {
      if (unref(getIsMobile)) {
        return false
      }
      return unref(getCollapsed)
    })

    const onSelect = (index) => {
      if (isUrl(index)) {
        window.open(index)
      } else {
        emit('click')
        push(index)
      }
    }

    return {
      getCollapsed,
      getAccordion,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,
      getMenuWidth,

      defaultActive,
      collapse,
      onSelect
    }
  }
})
</script>

<style lang="scss">
.el-menu-item {
  &:hover {
    background-color: #263445 !important;
  }
}

.nest-menu .el-sub-menu > .el-sub-menu__title,
.el-sub-menu .el-menu-item {
  background-color: #000c17 !important;

  &:hover {
    background-color: #263445 !important;
  }
}
</style>
