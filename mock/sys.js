import { resultSuccess } from './_util'

const menu = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'LAYOUT',
    meta: {
      single: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: '/dashboard/index',
        meta: {
          title: '仪表板',
          icon: 'Odometer',
          affix: true
        }
      }
    ]
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: 'LAYOUT',
    meta: {
      single: true
    },
    children: [
      {
        path: '/documentation',
        name: 'Documentation',
        component: '/documentation/index',
        meta: {
          title: '文档',
          icon: 'Document'
        }
      }
    ]
  },
  {
    path: '/nested',
    name: 'Nested',
    component: 'LAYOUT',
    meta: {
      title: '嵌套菜单',
      icon: 'Document'
    },
    children: [
      {
        path: '/nested/menu/menu1',
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: '/nested/menu/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
            children: [
              {
                path: '/nested/menu/menu1-1-1',
                component: '/nested/index',
                name: 'Menu1-1-1',
                meta: { title: 'Menu1-1-1' }
              }
            ]
          },
          {
            path: '/nested/menu/menu1-2',
            component: '/nested/index',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' }
          }
        ]
      },
      {
        path: '/nested/menu/menu2',
        component: '/nested/index',
        name: 'Menu2',
        meta: { title: 'Menu2' }
      }
    ]
  },
  {
    path: '/upms',
    name: 'Upms',
    component: 'LAYOUT',
    meta: {
      title: '权限管理',
      icon: 'Setting'
    },
    children: [
      {
        path: '/upms/account',
        component: '/upms/account/index',
        name: 'Account',
        meta: { title: '用户管理' }
      },
      {
        path: '/upms/role',
        component: '/upms/role/index',
        name: 'Role',
        meta: { title: '角色管理' }
      },
      {
        path: '/upms/menu',
        component: '/upms/menu/index',
        name: 'Menu',
        meta: { title: '菜单管理' }
      },
      {
        path: '/upms/dictionary',
        component: '/upms/dictionary/index',
        name: 'Dictionary',
        meta: { title: '字典管理' }
      }
    ]
  },
  {
    path: '/link',
    component: 'LAYOUT',
    meta: {
      single: true
    },
    children: [
      {
        path: 'https://github.com/zehuichan',
        name: 'Github',
        meta: {
          title: 'Github',
          icon: 'Odometer'
        }
      }
    ]
  }
]

export default [
  {
    url: '/sys/menu',
    method: 'get',
    response: (config) => {
      return resultSuccess(menu)
    }
  }
]
