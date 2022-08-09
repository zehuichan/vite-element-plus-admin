<template>
  <el-menu-item v-if="!hasMultiChild(item) && getShowMenu" :index="item.path">
    <menu-icon v-show="item.meta?.icon" :name="item.meta.icon" />
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-if="hasMultiChild(item) && getShowMenu" :index="item.path">
    <template #title>
      <menu-icon v-show="item.meta?.icon" :name="item.meta.icon" />
      <span>{{ item.meta?.title }}</span>
    </template>
    <menu-item
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
      :item="childrenItem"
    />
  </el-sub-menu>
</template>

<script>
import { computed, defineComponent } from 'vue'
import MenuIcon from './icon.vue'

export default defineComponent({
  name: 'MenuItem',
  components: {
    MenuIcon
  },
  props: {
    item: Object
  },
  setup(props) {
    const getShowMenu = computed(() => !props.item.meta?.hideMenu)

    const hasMultiChild = (menuTreeItem) => {
      return (
        !menuTreeItem.meta?.hideChildrenInMenu &&
        Reflect.has(menuTreeItem, 'children') &&
        !!menuTreeItem.children &&
        menuTreeItem.children.length > 0
      )
    }

    return {
      getShowMenu,
      hasMultiChild
    }
  }
})
</script>
