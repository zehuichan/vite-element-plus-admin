import { useTitle } from '@vueuse/core'
import { useNProgress } from '@vueuse/integrations/useNProgress'

import { useUserStoreWithOut } from '@/store/modules/user'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

import { PAGE_NOT_FOUND_ROUTE } from '@/router/index'

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

export function setupGuard(router) {
  createPermissionGuard(router)
  createProgressGuard(router)
}

export function createPermissionGuard(router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)

    // determine whether the user has logged in
    const token = userStore.getToken

    // Whitelist can be directly entered
    if (whiteList.includes(to.path)) {
      if (to.path === '/login' && token) {
        next(to.query?.redirect || '/')
        return
      }
      next()
      return
    }

    // token does not exist
    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }
      // redirect login page
      const redirectData = {
        path: '/login',
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    if (from.path === '/login' && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next('/')
      return
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const userInfo = await userStore.getUserInfoAction()
    console.log('userInfo', userInfo)
    const routes = await permissionStore.buildRoutesAction()
    console.log('routes', routes)
    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item)
    })
    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    permissionStore.setDynamicAddedRoute(true)

    // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath)
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}

export function createProgressGuard(router) {
  const { isLoading } = useNProgress()
  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })
  router.afterEach(() => {
    isLoading.value = false
  })
}
