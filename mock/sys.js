import { resultSuccess } from './_util'

const menu = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: '/dashboard/index',
    meta: {
      title: '仪表板', icon: 'el-icon-odometer', affix: true, roles: ['admin']
    }
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: '/documentation/index',
    meta: {
      title: '文档', icon: 'el-icon-document', affix: true, roles: ['admin']
    }
  },
  {
    path: '/upms',
    meta: {
      title: '权限管理', icon: 'el-icon-setting', roles: ['admin']
    },
    children: [
      {
        path: '/upms/account',
        component: '/upms/account/index',
        name: 'Account',
        meta: { title: '用户管理', roles: ['admin'] }
      },
      {
        path: '/upms/role',
        component: '/upms/role/index',
        name: 'Role',
        meta: { title: '角色管理', roles: ['admin'] }
      },
      {
        path: '/upms/menu',
        component: '/upms/menu/index',
        name: 'Menu',
        meta: { title: '菜单管理', roles: ['admin'] }
      },
      {
        path: '/upms/dictionary',
        component: '/upms/dictionary/index',
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