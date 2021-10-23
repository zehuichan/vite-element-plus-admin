import { createRouter, createWebHashHistory } from 'vue-router'

// basic components

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

const routes = [
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// config router
export function setupRouter(app) {
  app.use(router)
}
