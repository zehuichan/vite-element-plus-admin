import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { menu } from '@/api/sys'
import {
  flatMultiLevelRoutes,
  transformObjToRoute,
  transformRouteToMenu
} from '../helper'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    menu: []
  }),
  actions: {
    async generateRoutes() {
      try {
        const { data } = await menu()
        let routes = []
        let routeList = []
        // Dynamically introduce components
        routeList = transformObjToRoute(data)
        // Background routing to menu structure
        this.menu = transformRouteToMenu(data)
        // Convert multi-level routing to level 2 routing
        routeList = flatMultiLevelRoutes(routeList)
        routes = [...constantRoutes, ...asyncRoutes, ...routeList]
        return Promise.resolve(routes)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
