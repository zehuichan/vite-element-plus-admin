import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { menu } from '@/api/sys'


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
        console.log(data)
        return Promise.resolve([])
      } catch (error) {

      }
    }
  }
})