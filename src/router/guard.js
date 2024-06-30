import { useTitle } from '@vueuse/core'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useMultipleTabStoreWithOut } from '@/store/modules/multipleTab'

import { PageEnum } from '@/enums/pageEnum'
import { DICT_DATA_KEY, TOKEN_KEY } from '@/enums/cacheEnum'

import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router'

import { cancelAllRequest } from '@/utils/request'

import { removeTabChangeListener, setRouteChange } from '@/install/plugins/router-change'

import { Cache } from '@/utils/cache'

import projectSetting from '@/settings/projectSetting'

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect', '/exception/404', '/exception/403', '/exception/500']

export function setupGuard(router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
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

function createPageLoadingGuard(router) {
  const appStore = useAppStoreWithOut()

  router.beforeEach( (to) => {
    appStore.setPageLoadingAction(true)
    return true
  })

  router.afterEach(async () => {
    // TODO Looking for a better way
    // The timer simulates the loading time to prevent flashing too fast,
    setTimeout(() => {
      appStore.setPageLoading(false)
    }, 220)
    return true
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
  const appStore = useAppStoreWithOut()
  const userStore = useUserStoreWithOut()
  const dictStore = useDictStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)

    if (
      from.path === LOGIN_ROUTE.path &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== PageEnum.BASE_HOME
    ) {
      next(PageEnum.BASE_HOME)
      return
    }

    // determine whether the user has logged in
    const token = userStore.getToken

    // Whitelist can be directly entered
    if (whiteList.includes(to.path)) {
      if (to.path === LOGIN_ROUTE.path && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.getUserInfoAction()
          if (!isSessionTimeout) {
            next(decodeURIComponent(to.query?.redirect || '/'))
            return
          }
        } catch {

        }
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

    // get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }

    // 动态路由加载（首次）
    if (!permissionStore.getIsDynamicAddedRoute) {
      const routes = await permissionStore.buildRoutesAction()
      console.log(routes)
      // 动态添加可访问路由表
      routes.forEach((route) => {
        router.addRoute(route)
      })

      router.addRoute(PAGE_NOT_FOUND_ROUTE)

      // 记录动态路由加载完成
      permissionStore.setDynamicAddedRoute(true)

      // 现在的to动态路由加载之前的，可能为PAGE_NOT_FOUND_ROUTE（例如，登陆后，刷新的时候）
      // 此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
      return
    }

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 遇到不存在页面，后续逻辑不再处理redirect（阻止下面else逻辑）
      from.query.redirect = ''
      if (
        from.path === LOGIN_ROUTE.path &&
        to.fullPath !== PageEnum.BASE_HOME
      ) {
        // 登陆重定向不存在路由，转去“首页”
        next({ path: PageEnum.BASE_HOME, replace: true })
      } else {
        // 正常前往“404”页面
        next()
      }
    } else if (from.query.redirect) {
      // 存在redirect
      const redirect = decodeURIComponent(from.query.redirect || '')
      // 只处理一次 from.query.redirect
      // 也避免某场景（指向路由定义了 redirect）下的死循环
      from.query.redirect = ''

      if (redirect === to.fullPath) {
        // 已经被redirect
        next()
      } else {
        // 指向redirect
        next({ path: redirect, replace: true })
      }
    } else {
      // 正常访问
      next()
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
