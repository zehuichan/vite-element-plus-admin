import { createRouter, createWebHashHistory } from 'vue-router'

// basic components
import BasicLayout from '@/layouts'
import component from 'element-plus/packages/element-plus/component'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'Root',
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          title: '仪表板',
        },
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// config router
export function setupRouter(app) {
  app.use(router)
}
