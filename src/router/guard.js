import { useTitle, useStorage } from '@vueuse/core'
// progress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// store
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'

// no redirect whitelist
const whiteList = ['/login', '/auth-redirect']

export function setupRouterGuard(router) {
  // start progress bar
  NProgress.start()

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  router.beforeEach(async (to, from, next) => {
    // set page title
    useTitle(to.meta.title)
    // determine whether the user has logged in
    const hasToken = useStorage('token')

    if (hasToken.value) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (userStore.hasRoles) {
          next()
        } else {
          try {
            await userStore.getInfo()

            const routes = await permissionStore.generateRoutes()

            routes.forEach((route) => {
              router.addRoute(route)
            })

            next({ ...to, replace: true })
          } catch (error) {
            console.log(error)
            next(`/login?redirect=${to.path}`)
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({ path: '/login', replace: true })
      }
    }
  })

  router.afterEach((to, from) => {
    // finish progress bar
    NProgress.done()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
    // finish progress bar
    NProgress.done()
  })
}