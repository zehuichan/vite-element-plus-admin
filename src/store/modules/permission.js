import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { menu } from '@/api/sys'
import { asyncImportRoute, flatMultiLevelRoutes, transformObjToRoute, transformRouteToMenu } from '../helper'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => {
    return {
      menu: []
    }
  },
  actions: {
    async generateRoutes() {
      try {
        const { data } = await menu()
        let routeList = []
        // Dynamically introduce components
        routeList = transformObjToRoute(data)
        // 前端菜单
        this.menu = transformRouteToMenu(data)
        // Convert multi-level routing to level 2 routing
        routeList = flatMultiLevelRoutes(routeList)
        return Promise.resolve([...constantRoutes, ...asyncRoutes, ...routeList])
      } catch (error) {
        console.log(error)
      }
    }
  }
})