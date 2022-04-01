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
        const routers = asyncImportRoute(data)
        return Promise.resolve(routers)
      } catch (error) {

      }
    }
  }
})