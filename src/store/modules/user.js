import { defineStore } from 'pinia'
import { store } from '..'

import { router } from '@/router'
import { getInfo, login } from '@/api/user'
import { Cache } from '@/utils/cache'
import { PERMISSIONS_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import { isArray } from '@/utils/is'
import { PageEnum } from '@/enums/pageEnum'

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
      this.userInfo = null
      this.token = ''
      this.roles = []
      this.permissions = []
      this.sessionTimeout = false
      this.lastUpdateTime = 0
    },
    async login(params) {
      try {
        const { username, password } = params
        const res = await login({
          username: username.trim(),
          password: password
        })
        console.log(res)
        this.setToken(res.data.token)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfoAction() {
      if (!this.getToken) return null

      const res = await getInfo()
      console.log('getInfo', res.data)
      const { fields = null, permissions = [], roles = [] } = res.data

      // roles must be a non-empty array
      if (isArray(roles)) {
        this.setRoles(roles)
      } else {
        this.setRoles([])
      }

      this.setUserInfo(res.data)
      return res.data
    },
    logout(goLogin = false) {
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      if (goLogin) {
        // 直接回登陆页
        router.replace(PageEnum.BASE_LOGIN)
      } else {
        // 回登陆页带上当前路由地址
        router.replace({
          path: PageEnum.BASE_LOGIN,
          query: {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          },
        })
      }
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
