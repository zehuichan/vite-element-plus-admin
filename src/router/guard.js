import { store } from '@/store'
import { useTitle } from '@/hooks/useTitle'


export function setupRouterGuard(router) {
  router.beforeEach(async (to, from) => {

    // set page title
    document.title = useTitle(to.meta.title)
  })

  router.afterEach((to, from) => {

  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}