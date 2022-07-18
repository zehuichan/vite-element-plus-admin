import { createRouter, createWebHashHistory } from 'vue-router'

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard'
}

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue')
}

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/views/redirect/index.vue')
  },
  { path: '/:path(.*)*', redirect: '/404' }
]

//普通路由 无需验证权限
export const constantRoutes = [
  RootRoute,
  LoginRoute,
  {
    path: '/401',
    name: 'ErrorPage',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/404',
    name: 'ErrorPage',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/500',
    name: 'ErrorPage',
    component: () => import('@/views/error-page/500.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// config router
export function setupRouter(app) {
  app.use(router)
}
