import { createRouter, createWebHashHistory } from 'vue-router'

export const constantRoutes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error-page/500.vue'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '/:path(.*)*', redirect: '/404' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// config router
export function setupRouter(app) {
  app.use(router)
}
