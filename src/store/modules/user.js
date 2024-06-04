import { defineStore } from 'pinia'
import { store } from '..'
import { usePermissionStore } from './permission'

import { PAGE_NOT_FOUND_ROUTE, router } from '@/router'
import { getInfo, login } from '@/api/user'
import { Cache, } from '@/utils/cache'
import { PERMISSIONS_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { isArray } from '@/utils/is'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: undefined,
    userInfo: null,
    roles: [],
    permissions: [],
    sessionTimeout: false,
    lastUpdateTime: 0
  }),
  getters: {
    getToken() {
      return this.token || Cache.getItem(TOKEN_KEY)
    },
    getUserInfo() {
      return this.userInfo || Cache.getItem(USER_INFO_KEY) || {}
    },
    getRoles() {
      return this.roles.length > 0 ? this.roles : Cache.getItem(ROLES_KEY)
    },
    getPermissions() {
      return this.permissions.length > 0 ? this.permissions : Cache.getItem(PERMISSIONS_KEY)
    },
    getSessionTimeout() {
      return !!this.sessionTimeout
    },
    getLastUpdateTime() {
      return this.lastUpdateTime
    }
  },
  actions: {
    setToken(token) {
      this.token = token ? token : ''
      Cache.setItem(TOKEN_KEY, token)
    },
    setRoles(roles) {
      this.roles = roles
      Cache.setItem(ROLES_KEY, roles)
    },
    setPermissions(permissions) {
      this.permissions = permissions
      Cache.setItem(PERMISSIONS_KEY, permissions)
    },
    setUserInfo(info) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      Cache.setItem(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.token = ''
      this.userInfo = null
      this.roles = []
      this.permissions = []
      this.sessionTimeout = false
      this.lastUpdateTime = 0
    },
    async login(params) {
      try {
        const { username, password } = params
        const data = await login({
          username: username.trim(),
          password: password
        })
        const { token } = data
        this.setToken(token)
        return this.afterLoginAction()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction() {
      if (!this.getToken) return null
      // get user info
      await this.getUserInfoAction()

      const { sessionTimeout } = this
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.unshift({ path: '/', redirect: routes[0].children[0].path })
          routes.forEach((route) => {
            router.addRoute(route)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE)
          console.log(routes)
          permissionStore.setDynamicAddedRoute(true)
        }
      }
    },
    async getUserInfoAction() {
      if (!this.getToken) return null

      const data = await getInfo()
      const { roles = [] } = data

      // roles must be a non-empty array
      if (isArray(roles)) {
        this.setRoles(roles)
      } else {
        data.roles = []
        this.setRoles([])
      }

      this.setUserInfo(data)
      return Promise.resolve(data)
    },
    logout() {
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
