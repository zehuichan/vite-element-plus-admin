import {createRouter, createWebHashHistory} from 'vue-router'

import Layout from '@/layout'

const routes = [
  {path: '/', redirect: '/index'},
  {
    path: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'index'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router