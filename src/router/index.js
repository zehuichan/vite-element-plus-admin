import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router