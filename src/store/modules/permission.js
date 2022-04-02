import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router'
import { menu } from '@/api/sys'
import { asyncImportRoute } from '../helper'

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
        this.menu = asyncImportRoute(data)
        const routes = constantRoutes.concat(this.menu).concat(asyncRoutes)
        return Promise.resolve(routes)
      } catch (error) {

      }
    }
  }
})