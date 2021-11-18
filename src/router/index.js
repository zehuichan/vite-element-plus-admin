import { createRouter, createWebHashHistory } from 'vue-router'

// basic components
import BasicLayout from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'dashboard',
        meta: { title: '仪表板', hidden: true },
      },
    ]
  },
  {
    path: '/nested',
    component: BasicLayout,
    name: 'nested',
    redirect: '/nested/menu1',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: '/nested/menu1',
        component: () => import('@/views/nested'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: '/nested/menu1/menu1-1',
            component: () => import('@/views/nested'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: '/nested/menu1/menu1-2',
            component: RouteView,
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: '/nested/menu1/menu1-3',
            component: () => import('@/views/nested'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: '/nested/menu2',
        component: () => import('@/views/nested'),
        name: 'Menu2',
        meta: { title: 'Menu2' }
      }
    ]
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// config router
export function setupRouter(app) {
  app.use(router)
}
