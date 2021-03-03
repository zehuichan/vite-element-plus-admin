import {createRouter, createWebHashHistory} from 'vue-router'

import Layout from '@/layout'

const routes = [
  { path: '/', redirect: '/vcomponents' },
  {
    path: '/vcomponents',
    component: Layout,
    children: [
      {
        path: '/vcomponents',
        component: () => import('@/views/vcomponents'),
        name: 'index',
        meta: {
          title: 'vcomponents'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router