import { useTitle } from '@vueuse/core'
import { useUserStoreWithOut } from '@/store/modules/user'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

export function setupRouterGuard(router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)

    if (from.path === '/login' && to.name === 'ErrorPage') {
      next('/')
      return
    }

    // Whitelist can be directly entered
    if (whiteList.includes(to.path)) {
      next()
      return
    }

    // determine whether the user has logged in
    const token = userStore.getToken

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

    permissionStore.setDynamicAddedRoute(true)

    const redirectPath = from.query.redirect || to.path
    const redirect = decodeURIComponent(redirectPath)
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect }
    next(nextData)
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
