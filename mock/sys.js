import { resultSuccess } from './_util'

const menu = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: '/dashboard/index',
    meta: {
      title: '仪表板',
      icon: 'odometer',
      affix: true
    }
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: '/documentation/index',
    meta: {
      title: '文档',
      icon: 'document',
      affix: true
    }
  },
  {
    path: '/demo',
    name: 'Demo',
    component: '/demo/index',
    meta: {
      title: 'Demo',
      icon: 'document'
    }
  },
  {
    path: '/feature',
    name: 'feature',
    component: 'LAYOUT',
    meta: {
      title: '功能',
      icon: 'Guide'
    },
    children: [
      {
        path: 'unocss',
        component: '/feat/unocss/index',
        name: 'unocss',
        meta: { title: 'unocss' }
      }
    ]
  },
  {
    path: '/comp',
    name: 'comp',
    component: 'LAYOUT',
    meta: {
      title: '组件',
      icon: 'Notification'
    },
    children: [
      {
        path: '/comp/schemaform',
        name: 'schemaform',
        meta: { title: 'schemaform' },
        children: [
          {
            path: '/comp/schemaform/refForm',
            component: '/comp/schemaform/refForm',
            name: 'refForm',
            meta: { title: 'refForm' }
          },
          {
            path: '/comp/schemaform/useForm',
            component: '/comp/schemaform/useForm',
            name: 'useForm',
            meta: { title: 'useForm' }
          },
          {
            path: '/comp/schemaform/dynamicForm',
            component: '/comp/schemaform/dynamicForm',
            name: 'dynamicForm',
            meta: { title: 'dynamicForm' }
          },
          {
            path: '/comp/schemaform/appendForm',
            component: '/comp/schemaform/appendForm',
            name: 'appendForm',
            meta: { title: 'appendForm' }
          },
          {
            path: '/comp/schemaform/searchForm',
            component: '/comp/schemaform/searchForm',
            name: 'searchForm',
            meta: { title: 'searchForm' }
          }
        ]
      }
    ]
  },
  {
    path: '/nested',
    name: 'nested',
    component: 'LAYOUT',
    meta: {
      title: '嵌套菜单',
      icon: 'Menu'
    },
    children: [
      {
        path: '/nested/menu/menu1',
        name: 'menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: '/nested/menu/menu1-1',
            name: 'menu1-1',
            meta: { title: 'Menu1-1' },
            children: [
              {
                path: '/nested/menu/menu1-1-1',
                component: '/nested/index',
                name: 'menu1-1-1',
                meta: { title: 'Menu1-1-1' }
              }
            ]
          },
          {
            path: '/nested/menu/menu1-2',
            component: '/nested/index',
            name: 'menu1-2',
            meta: { title: 'Menu1-2' }
          }
        ]
      },
      {
        path: '/nested/menu/menu2',
        component: '/nested/index',
        name: 'menu2',
        meta: { title: 'Menu2' }
      }
    ]
  },
  {
    path: '/upms',
    name: 'upms',
    component: 'LAYOUT',
    meta: {
      title: '权限管理',
      icon: 'Tools'
    },
    children: [
      {
        path: '/upms/account',
        component: '/upms/account/index',
        name: 'account',
        meta: { title: '用户管理' }
      },
      {
        path: '/upms/role',
        component: '/upms/role/index',
        name: 'role',
        meta: { title: '角色管理' }
      },
      {
        path: '/upms/menu',
        component: '/upms/menu/index',
        name: 'menu',
        meta: { title: '菜单管理' }
      },
      {
        path: '/upms/dictionary',
        component: '/upms/dictionary/index',
        name: 'dictionary',
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
          icon: 'Link'
        }
      }
    ]
  }
]

export default [
  {
    url: '/sys/menu',
    method: 'get',
    response: () => {
      return resultSuccess(menu)
    }
  }
]
