const MENU_DATA = [
  {
    path: '/dashboard',
    component: 'LAYOUT',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: '/dashboard/index',
        meta: {
          title: '仪表板',
          icon: 'dashboard',
        }
      },
    ]
  },
  {
    path: '/dashboard',
    component: 'LAYOUT',
    children: [
      {
        path: '/documentation',
        name: 'Documentation',
        component: '/documentation/index',
        meta: {
          title: '文档',
          icon: 'doc-success',
        }
      },
    ]
  },
  {
    path: '/demo',
    name: 'Demo',
    component: '/demo/index',
    meta: {
      title: 'Demo',
      icon: 'lightning'
    }
  },
  {
    path: '/feature',
    name: 'feature',
    component: 'LAYOUT',
    meta: {
      title: '功能',
      icon: 'tips'
    },
    children: [
      {
        path: '/feature/unocss',
        component: '/feat/unocss/index',
        name: 'unocss',
        meta: {
          title: 'unocss',
          icon: 'tips'
        }
      }
    ]
  },
  {
    path: '/comp',
    name: 'comp',
    component: 'LAYOUT',
    meta: {
      title: '组件',
      icon: 'components'
    },
    children: [
      {
        path: '/comp/form',
        name: 'form',
        meta: {
          title: 'form',
          icon: 'components'
        },
        children: [
          {
            path: '/comp/form/refForm',
            component: '/comp/form/refForm',
            name: 'refForm',
            meta: { title: 'refForm' }
          },
          {
            path: '/comp/form/useForm',
            component: '/comp/form/useForm',
            name: 'useForm',
            meta: { title: 'useForm' }
          },
          {
            path: '/comp/form/dynamicForm',
            component: '/comp/form/dynamicForm',
            name: 'dynamicForm',
            meta: { title: 'dynamicForm' }
          },
          {
            path: '/comp/form/appendForm',
            component: '/comp/form/appendForm',
            name: 'appendForm',
            meta: { title: 'appendForm' }
          },
          {
            path: '/comp/form/searchForm',
            component: '/comp/form/searchForm',
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
      icon: 'hamburger-button'
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
      title: '系统管理',
      icon: 'config'
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

export {
  MENU_DATA
}
