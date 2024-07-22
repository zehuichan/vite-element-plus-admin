import { defineStore } from 'pinia'
import { store } from '..'

import { constantRoutes, PAGE_NOT_FOUND_ROUTE } from '@/router'
import { menu } from '@/api/sys'

import { flatMultiLevelRoutes, routerGenerator, transformObjToRoute } from '@/router/routeHelper'
import { transformRouteToMenu } from '@/router/menuHelper'
import { filter } from '@/utils/treeHelper'
import { PageEnum } from '@/enums/pageEnum'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    // Whether the route has been dynamically added
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // To trigger a menu update
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // Backstage menu list
    // 后台菜单列表
    backMenuList: [],
    // menu List
    // 菜单列表
    frontMenuList: [],
  }),
  getters: {
    getBackMenuList(state) {
      return state.backMenuList
    },
    getFrontMenuList(state) {
      return state.frontMenuList
    },
    getLastBuildMenuTime(state) {
      return state.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(state) {
      return state.isDynamicAddedRoute
    }
  },
  actions: {
    setBackMenuList(list) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },
    setFrontMenuList(list) {
      this.frontMenuList = list
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setDynamicAddedRoute(added) {
      this.isDynamicAddedRoute = added
    },
    resetState() {
      this.isDynamicAddedRoute = false
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async buildRoutesAction() {
      let routes = []

      const routeRemoveIgnoreFilter = (route) => {
        const { meta } = route
        // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
        const { ignoreRoute } = meta || {}
        // arr.filter 返回 true 表示该元素通过测试
        return !ignoreRoute
      }

      // 根据设置的首页path，修正routes中的affix标记（固定首页）
      const patchHomeAffix = (routes) => {
        if (!routes || routes.length === 0) return
        let homePath = PageEnum.BASE_HOME

        function patcher(routes, parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }

        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      let routeList = []

      try {
        const res = await menu()
        routeList = res.data
      } catch (error) {
        console.log(error)
      }

      // 清洗数据
      routeList = routerGenerator(routeList)

      // Dynamically introduce components
      // 动态引入组件
      routeList = transformObjToRoute(routeList)

      // Background routing to menu structure
      // 后台路由到菜单结构
      const backMenuList = transformRouteToMenu(routeList)
      this.setBackMenuList(backMenuList)

      // remove meta.ignoreRoute item
      // 删除 meta.ignoreRoute 项
      routeList = filter(routeList, routeRemoveIgnoreFilter)
      routeList = routeList.filter(routeRemoveIgnoreFilter)

      // Convert multi-level routing to level 2 routing
      // 将多级路由转换为 2 级路由
      routeList = flatMultiLevelRoutes(routeList)
      routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]

      patchHomeAffix(routes)
      return routes
    }
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
