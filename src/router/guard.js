import { useTitle } from '@vueuse/core'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useMultipleTabStoreWithOut } from '@/store/modules/multipleTab'

import { PageEnum } from '@/enums/pageEnum'
import { DICT_DATA_KEY, TOKEN_KEY } from '@/enums/cacheEnum'

import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router'

import { cancelAllRequest } from '@/utils/request'

import { removeTabChangeListener, setRouteChange } from '@/install/plugins/router-change'

import projectSetting from '@/settings/projectSetting'

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

export function setupGuard(router) {
  createPageGuard(router)
  createHttpGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createStateGuard(router)
}

function createPageGuard(router) {
  const loadedPageMap = new Map()

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    setRouteChange(to)

    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

function createHttpGuard(router) {
  const { removeAllHttpPending } = projectSetting

  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    if (removeAllHttpPending) {
      cancelAllRequest()
    }
    return true
  })
}

function createProgressGuard(router) {
  router.beforeEach((to, from, next) => {
    nprogress.start()
    next()
  })

  router.afterEach(() => {
    nprogress.done()
  })
}

function createPermissionGuard(router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)

    // determine whether the user has logged in
    const token = userStore.getToken

    // Whitelist can be directly entered
    if (whiteList.includes(to.path)) {
      if (to.path === LOGIN_ROUTE.path && token) {
        next((to.query?.redirect) || '/')
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
        path: LOGIN_ROUTE.path,
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

    if (
      from.path === LOGIN_ROUTE.path &&
      to.name === PAGE_NOT_FOUND_ROUTE.name
    ) {
      next('/')
      return
    }

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    // 默认添加根路由
    routes.unshift({ path: '/', redirect: routes[0].children[0].path })

    // 动态添加可访问路由表
    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    permissionStore.setDynamicAddedRoute(true)

    // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}

function createStateGuard(router) {
  const appStore = useAppStoreWithOut()
  const tabStore = useMultipleTabStoreWithOut()
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.afterEach((to) => {
    if (to.path === LOGIN_ROUTE.path) {
      appStore.resetAllState()
      tabStore.resetState()
      userStore.resetState()
      permissionStore.resetState()
      removeTabChangeListener()
    }
  })
}
