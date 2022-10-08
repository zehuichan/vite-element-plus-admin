import { defineStore } from 'pinia'
import { store, usePermissionStore } from '..'

import { PAGE_NOT_FOUND_ROUTE, router } from '@/router'
import { getInfo, login } from '@/api/user'
import { Cache, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/utils/cache'
import { isArray } from '@/utils/is'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: undefined,
    userInfo: null,
    roleList: [],
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
    getRoleList() {
      return this.roleList.length > 0 ? this.roleList : Cache.getItem(ROLES_KEY)
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
    setRoleList(roleList) {
      this.roleList = roleList
      Cache.setItem(ROLES_KEY, roleList)
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
      this.roleList = []
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
        this.setRoleList(roles)
      } else {
        data.roles = []
        this.setRoleList([])
      }

      this.setUserInfo(data)
      return Promise.resolve(data)
    },
    async logout() {
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
