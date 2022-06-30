import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { getInfo, login } from '@/api/user'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: useStorage('token', ''),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    permissions: [],
  }),
  getters: {
    hasRoles() {
      return this.roles && this.roles.length > 0
    }
  },
  actions: {
    setToken(token) {
      this.token = token ? token : ''
      useStorage('token', token)
    },
    async login(params) {
      try {
        const { username, password } = params
        const { data: { token } } = await login({ username: username.trim(), password: password })
        this.setToken(token)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getInfo() {
      try {
        const { data } = await getInfo(this.token)

        if (!data) {
          return Promise.reject('Verification failed, please Login again.')
        }

        const { roles, permissions, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          return Promise.reject('getInfo: roles must be a non-null array!')
        }

        this.roles = roles
        this.permissions = permissions
        this.name = name
        this.avatar = avatar
        this.introduction = introduction

        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})