import { createRouter, createWebHashHistory } from 'vue-router'
import {
  ERROR_PAGE,
  LAYOUT,
  REDIRECT_PAGE,
  PAGE,
  LOGIN_NAME,
  PAGE_NOT_FOUND_NAME,
  REDIRECT_NAME,
} from '@/router/constant'

const modulesRoutes = import.meta.glob('./modules/**/*.js', { eager: true })

const modules = Object.keys(modulesRoutes).reduce((modules, modulePath) => {
  const value = modulesRoutes[modulePath].default
  modules.push(...value)
  return modules
}, [])

const WHITE_NAME_LIST = ['Root', 'Dashboard', 'Login', 'Redirect', 'RedirectTo', 'PageNotFound']

export const ROOT_ROUTE = {
  path: '/',
  component: () => import('@/views/before-enter/index.vue')
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
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
      name: REDIRECT_NAME,
      component: REDIRECT_PAGE,
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ]
}

export const EXCEPTION_ROUTE = {
  path: '/exception',
  component: PAGE,
  meta: {
    title: '异常页',
    icon: 'ExceptionOutlined'
  },
  children: [
    {
      path: '404',
      name: 'PageNotFound',
      component: () => import('@/views/error-page/exception.vue'),
      meta: {
        title: '404',
        icon: '404'
      }
    },
    {
      path: '403',
      name: 'Forbidden',
      component: () => import('@/views/error-page/exception.vue'),
      meta: {
        title: '403',
        icon: '403'
      }
    },
    {
      path: '500',
      name: 'ServerError',
      component: () => import('@/views/error-page/exception.vue'),
      meta: {
        title: '500',
        icon: '500'
      }
    }
  ]
}

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/not-found',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: ERROR_PAGE,
      meta: {
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

//普通路由 无需验证权限
export const constantRoutes = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  REDIRECT_ROUTE,
  EXCEPTION_ROUTE,
  PAGE_NOT_FOUND_ROUTE
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [...constantRoutes, ...modules],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router
export function setupRouter(app) {
  app.use(router)
}
