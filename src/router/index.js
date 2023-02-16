import { createRouter, createWebHashHistory } from 'vue-router'
import {
  ERROR_PAGE,
  LAYOUT,
  LOGIN_NAME,
  PAGE_NOT_FOUND_NAME,
  REDIRECT_NAME
} from '@/router/constant'

export const ROOT_ROUTE = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard'
}

export const LOGIN_ROUTE = {
  path: '/login',
  name: LOGIN_NAME,
  component: () => import('@/views/login/index.vue')
}

export const REDIRECT_ROUTE = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    hideBreadcrumb: true,
    hideMenu: false
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: ERROR_PAGE,
      meta: {
        hideBreadcrumb: true,
        hideMenu: false
      }
    }
  ]
}

//普通路由 无需验证权限
export const constantRoutes = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE
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
