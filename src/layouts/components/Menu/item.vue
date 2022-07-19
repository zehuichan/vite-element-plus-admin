<template>
  <el-menu-item v-if="!hasMultiChild(item) && getShowMenu" :index="item.path">
    <el-icon v-if="item.meta.icon">
      <component :is="item.meta.icon" />
    </el-icon>
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-if="hasMultiChild(item) && getShowMenu" :index="item.path">
    <template #title>
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <menu-item v-for="sub in item.children || []" :key="sub.path" :item="sub" />
  </el-sub-menu>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: Object
  },
  setup(props) {
    const getShowMenu = computed(() => !props.item.meta?.hidden)

    const hasMultiChild = (item) => {
      return (
        !item.meta?.hidden &&
        Reflect.has(item, 'children') &&
        !!item.children &&
        item.children.length > 0
      )
    }

    return {
      getShowMenu,
      hasMultiChild
    }
  }
})
</script>
