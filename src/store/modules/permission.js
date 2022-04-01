import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { menu } from '@/api/sys'
import { asyncImportRoute } from '../helper'

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => {
    return {
      routes: []
    }
  },
  actions: {
    async generateRoutes() {
      try {
        let accessedRoutes
        let permissionRouters
        const { data } = await menu()
        const routers = constantRoutes.concat(asyncImportRoute(data)).concat(asyncRoutes)
        return Promise.resolve(routers)
      } catch (error) {

      }
    }
  }
})