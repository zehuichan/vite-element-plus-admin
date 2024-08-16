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

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

import { isUrl } from '@/utils/is'

export default defineComponent({
  name: 'AppMenu',
  components: {
    MenuItem
  },
  props: {
    collapse: Boolean,
    routes: Array
  },
  emits: ['click'],
  setup(props, { emit }) {
    const {
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

    const onSelect = (index) => {
      if (isUrl(index)) {
        window.open(index)
      } else {
        emit('click')
        const now = new Date().getTime()
        push(`${index}?_t=${now}`)
      }
    }

    return {
      getAccordion,
      getMenuBackgroundColor,
      getMenuTextColor,
      getMenuActiveTextColor,
      getMenuWidth,

      defaultActive,
      onSelect
    }
  }
})
</script>

<style lang="scss">
.el-menu-item:not(.is-active) {
  &:hover {
    color: #fff;
  }
}
</style>
