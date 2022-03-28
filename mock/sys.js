import { resultSuccess } from './_util'

const menu = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '仪表板', icon: 'el-icon-odometer', affix: true, roles: ['admin']
    }
  },
  {
    path: '/documentation',
    name: 'Documentation',
    meta: {
      title: '文档', icon: 'el-icon-document', affix: true, roles: ['admin']
    }
  },
  {
    path: '/ums',
    meta: {
      title: '权限管理', icon: 'el-icon-setting', roles: ['admin']
    },
    children: [
      {
        path: '/ums/user',
        component: 'User',
        name: 'User',
        meta: { title: '用户管理', roles: ['admin'] }
      },
      {
        path: '/ums/role',
        component: 'Role',
        name: 'Role',
        meta: { title: '角色管理', roles: ['admin'] }
      },
      {
        path: '/ums/menu',
        component: 'Menu',
        name: 'Menu',
        meta: { title: '菜单管理', roles: ['admin'] }
      },
      {
        path: '/ums/dictionary',
        component: 'Dictionary',
        name: 'Dictionary',
        meta: { title: '字典管理', roles: ['admin'] }
      },
    ]
  }
]

export default [
  {
    url: '/sys/menu',
    method: 'get',
    response: config => {
      return resultSuccess(menu)
    }
  }
]