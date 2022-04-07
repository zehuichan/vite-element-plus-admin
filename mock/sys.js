import { resultSuccess } from './_util'

const menu = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'LAYOUT',
    meta: {
      title: '仪表板', icon: 'el-icon-odometer', affix: true, alwaysShow: true, roles: ['admin']
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: '/dashboard/index',
        meta: {
          title: '仪表板', icon: 'el-icon-odometer', affix: true, roles: ['admin']
        },
      }
    ]
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: 'LAYOUT',
    meta: {
      title: '文档', icon: 'el-icon-document', affix: true, alwaysShow: true, roles: ['admin']
    },
    children: [
      {
        path: '/documentation',
        name: 'Documentation',
        component: '/documentation/index',
        meta: {
          title: '文档', icon: 'el-icon-document', affix: true, roles: ['admin']
        },
      }
    ]
  },
  {
    path: '/nested',
    name: 'Nested',
    component: 'LAYOUT',
    meta: {
      title: '嵌套菜单', icon: 'el-icon-document', roles: ['admin']
    },
    children: [
      {
        path: '/nested/menu/menu1',
        name: 'Menu1',
        meta: { title: 'Menu1', roles: ['admin'] },
        children: [
          {
            path: '/nested/menu/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1', roles: ['admin'] },
            children: [
              {
                path: '/nested/menu/menu1-1-1',
                component: '/nested/index',
                name: 'Menu1-1-1',
                meta: { title: 'Menu1-1-1', roles: ['admin'] },
              }
            ]
          },
          {
            path: '/nested/menu/menu1-2',
            component: '/nested/index',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2', roles: ['admin'], },
          }
        ]
      },
      {
        path: '/nested/menu/menu2',
        component: '/nested/index',
        name: 'Menu2',
        meta: { title: 'Menu2', roles: ['admin'] },
      }
    ]
  },
  {
    path: '/upms',
    name: 'Upms',
    component: 'LAYOUT',
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
        meta: { title: '字典管理', hidden: false, roles: ['admin'] }
      },
    ]
  },
  {
    path: '/link',
    component: 'LAYOUT',
    meta: {
      title: 'Github', icon: 'el-icon-odometer', affix: true, alwaysShow: true, roles: ['admin']
    },
    children: [
      {
        path: 'https://github.com/zehuichan',
        name: 'Github',
        meta: {
          title: 'Github', icon: 'el-icon-odometer', affix: true, roles: ['admin']
        }
      }
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