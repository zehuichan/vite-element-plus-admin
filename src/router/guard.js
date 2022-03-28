import { useTitle } from '@vueuse/core'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

export function setupRouterGuard(router) {
  // start progress bar
  NProgress.start()
  router.beforeEach(async (to, from) => {
    // set page title
    useTitle(to.meta.title)
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