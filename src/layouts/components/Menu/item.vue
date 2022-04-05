<template>
  <el-menu-item
    v-if="!hasMultiChild(item) && getShowMenu"
    :index="item.path"
  >
    <el-icon>
      <location/>
    </el-icon>
    <template #title>
      <span>{{ item.meta?.title }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu
    v-if="hasMultiChild(item) && getShowMenu"
    :index="item.path"
  >
    <template #title>
      <el-icon>
        <location/>
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <menu-item
      v-for="sub in item.children || []"
      :key="sub.path"
      :item="sub"
    />
  </el-sub-menu>
</template>

<script>
import path from 'path'
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
import { Location } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'MenuItem',
  components:{
    Location
  },
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
    const getShowMenu = computed(() => !props.item.meta?.hidden)

    const hasMultiChild = (item) => {
      return (
        !item.meta?.hidden &&
        Reflect.has(item, 'children') &&
        !!item.children &&
        item.children.length > 0
      )
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
      getShowMenu,
      hasMultiChild,
      resolvePath
    }
  }
})
</script>