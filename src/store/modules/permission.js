import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { menu } from '@/api/sys'
import {
  flatMultiLevelRoutes,
  transformObjToRoute,
  transformRouteToMenu
} from '../helper'
import { store } from '..'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    menus: [],
    routers: constantRoutes,
    addRouters: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false
  }),
  getters: {
    getMenus() {
      return this.menus
    },
    getIsDynamicAddedRoute() {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setDynamicAddedRoute(added) {
      this.isDynamicAddedRoute = added
    },
    // 设置动态路由
    setRouters(routers) {
      this.addRouters = routers
    },
    // 设置动态菜单
    setMenus(menus) {
      this.menus = menus
    },
    async buildRoutesAction() {
      try {
        let routes = []
        let routeList = []
        let menus = []
        const { data } = await menu()
        // Dynamically introduce components
        // 动态引入组件
        routeList = transformObjToRoute(data)

        // Background routing to menu structure
        // 后台路由到菜单结构
        menus = transformRouteToMenu(data)

        // Convert multi-level routing to level 2 routing
        // 将多级路由转换为 2 级路由
        routeList = flatMultiLevelRoutes(routeList)
        routes = [...constantRoutes, ...asyncRoutes, ...routeList]
        this.setRouters(routes)
        this.setMenus(menus)
        return toRaw(routes)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
