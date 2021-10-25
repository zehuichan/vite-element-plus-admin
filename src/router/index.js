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
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'Root',
    },
    children: []
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
