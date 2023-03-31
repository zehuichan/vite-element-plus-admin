<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in routes" :key="item.path">
        <div v-if="!hasRedirect(routes, item)" class="no-redirect">
          {{ item.meta.title }}
        </div>
        <router-link v-else :to="pathCompile(item)">
          {{ item.meta.title }}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'

import { usePermissionStore } from '@/store'

import { filter } from '@/utils/treeHelper'

import { REDIRECT_NAME } from '@/router/constant'
import { getAllParentPath } from '@/router/menuHelper'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const permissionStore = usePermissionStore()

    const { currentRoute } = useRouter()

    const routes = computed(() => {
      if (currentRoute.value.name === REDIRECT_NAME) return []

      const menus = permissionStore.getMenus

      const routeMatched = currentRoute.value.matched
      const cur = routeMatched?.[routeMatched.length - 1]
      let { path } = currentRoute.value

      if (cur && cur?.meta?.currentActiveMenu) {
        path = cur.meta.currentActiveMenu
      }

      const parent = getAllParentPath(menus, path)
      const filterMenus = menus.filter((item) => item.path === parent[0])
      const matched = getMatched(filterMenus, parent)

      if (!matched || matched.length === 0) return

      const breadcrumbList = filterItem(matched)

      if (currentRoute.value.meta?.currentActiveMenu) {
        breadcrumbList.push({
          ...currentRoute.value,
          name: currentRoute.value.meta?.title || currentRoute.value.name
        })
      }

      return breadcrumbList
    })

    function getMatched(menus, parent) {
      const metched = []
      menus.forEach((item) => {
        if (parent.includes(item.path)) {
          metched.push({
            ...item,
            name: item.meta?.title || item.name
          })
        }
        if (item.children?.length) {
          metched.push(...getMatched(item.children, parent))
        }
      })
      return metched
    }

    function filterItem(list) {
      return filter(list, (item) => {
        const { meta, name } = item
        if (!meta) {
          return !!name
        }
        const { title, hideBreadcrumb, hideMenu } = meta
        if (!title || hideBreadcrumb || hideMenu) {
          return false
        }
        return true
      }).filter((item) => !item.meta?.hideBreadcrumb)
    }

    function hasRedirect(routes, route) {
      return routes.indexOf(route) !== routes.length - 1
    }

    function pathCompile(route) {
      const { redirect, path } = route
      if (redirect) {
        return redirect
      }
      const { params } = unref(currentRoute)
      const toPath = compile(path)
      return toPath(params)
    }

    return {
      routes,
      hasRedirect,
      pathCompile
    }
  }
})
</script>

<style lang="scss">
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

/* breadcrumb transition */
.breadcrumb-move,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>