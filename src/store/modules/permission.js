import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'
import { menu } from '@/api/sys'
import { flatMultiLevelRoutes, transformObjToRoute } from '@/router/routeHelper'
import { transformRouteToMenu } from '@/router/menuHelper'
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
        let routeList = []

        const res = await menu()
        routeList = res.data

        // Dynamically introduce components
        // 动态引入组件
        routeList = transformObjToRoute(routeList)

        // Background routing to menu structure
        // 后台路由到菜单结构
        const menus = transformRouteToMenu(routeList)

        // Convert multi-level routing to level 2 routing
        // 将多级路由转换为 2 级路由
        routeList = flatMultiLevelRoutes(routeList)
        this.setRouters(routeList)
        this.setMenus(menus)
        return toRaw(routeList)
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
