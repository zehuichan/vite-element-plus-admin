<template>
  <el-menu-item
    v-if="child && !hasMultiChild(child)"
    :index="child.path"
  >
    <template #title>{{ child.meta?.title }}</template>
  </el-menu-item>
  <el-sub-menu v-else :index="child.path" popper-append-to-body>
    <template #title>
      <span>{{ child.meta?.title }}</span>
    </template>
    <menu-item
      v-for="sub in child.children"
      :key="sub.path"
      :item="sub"
    />
  </el-sub-menu>
</template>

<script>
import path from 'path'
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
import MenuItem from './item'
import MenuLink from './link'

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const child = computed(() => {
      return props.item.meta?.hidden ? undefined : props.item
    })

    console.log(child.value)

    const hasMultiChild = (item) => {
      return item.children
        ? item.children.filter((item) => !item.meta?.hidden).length > 1
        : false
    }

    const resolvePath = (routePath) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      child,
      hasMultiChild,
      resolvePath
    }
  },
  components: {
    MenuItem,
    MenuLink
  }
})
</script>

<style scoped>

</style>