<template>
  <el-menu-item v-if="!menuHasChildren(item) && getShowMenu" :index="item.path">
    <icon-park v-if="item.meta?.icon" :type="item.meta.icon" />
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu
    class="nest-menu"
    v-if="menuHasChildren(item) && getShowMenu"
    :index="item.path"
  >
    <template #title>
      <icon-park v-if="item.meta?.icon" :type="item.meta.icon" />
      <span>{{ item.meta?.title }}</span>
    </template>
    <menu-item
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
      :item="childrenItem"
    />
  </el-sub-menu>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'MenuItem',
  isSubMenu: true
})
const props = defineProps({
  item: Object
})

const getShowMenu = computed(() => !props.item.meta?.hideMenu)

const menuHasChildren = (menuTreeItem) => {
  return (
    !menuTreeItem.meta?.hideChildrenInMenu &&
    Reflect.has(menuTreeItem, 'children') &&
    !!menuTreeItem.children &&
    menuTreeItem.children.length > 0
  )
}
</script>
