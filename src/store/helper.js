import LayoutMap, { getParentLayout } from '@/router/constant'
import { cloneDeep, omit } from 'lodash-es'
import { createRouter, createWebHashHistory } from 'vue-router'

export function asyncImportRoute(routes) {
  const dynamicViewsModules = import.meta.globEager('../views/**/*.{vue,jsx,tsx}')
  const res = []
  routes.forEach((item) => {
    const tmp = {
      ...item
    }
    if (tmp.component) {
      const layoutFound = LayoutMap.get(tmp.component.toUpperCase())
      if (layoutFound) {
        tmp.component = layoutFound
      } else {
        tmp.component = tmp.component ? dynamicImport(dynamicViewsModules, tmp.component) : getParentLayout()
      }
    }

    if (tmp.children && tmp.children.length) {
      tmp.children = asyncImportRoute(tmp.children)
    }

    res.push(tmp)
  })

  return res
}

function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') ?? component.endsWith('.jsx') ?? component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey].default
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.{vue,jsx,tsx}` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return false
  } else {
    console.warn(`${component} is not found`)
    return false
  }
}

// 路由降级
export function flatMultiLevelRoutes(routeModules) {
  const modules = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    promoteRouteLevel(routeModule)
  }
  return modules
}

// 层级是否大于2
function isMultipleRoute(routeModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 生成二级路由
function promoteRouteLevel(routeModule) {
  // Use vue-router to splice menus
  let router = createRouter({
    routes: [routeModule],
    history: createWebHashHistory(),
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'))
}

// 添加所有子菜单
function addToChildren(routes, children, routeModule) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

// 路由转菜单
export function transformRouteToMenu(routeList) {
  const menuList = []
  routeList.forEach((item) => {

    const tmp = {
      ...item
    }

    if (tmp.meta.alwaysShow || tmp?.children.length === 1) {
      const realItem = tmp?.children?.[0]
      realItem && menuList.push(realItem)
    } else {
      menuList.push(tmp)
    }
  })

  return menuList
}