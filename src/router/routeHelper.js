import { LAYOUT, BLANK, getParentLayout } from '@/router/constant'
import { cloneDeep, omit } from 'lodash-unified'
import { createRouter, createWebHashHistory } from 'vue-router'
import { treeMap } from '@/utils/treeHelper'

const LayoutMap = new Map()

LayoutMap.set('LAYOUT', LAYOUT)
LayoutMap.set('BLANK', BLANK)

let dynamicViewsModules

function asyncImportRoute(routes) {
  dynamicViewsModules = import.meta.glob('../views/**/*.{vue,jsx,tsx}')
  if (!routes) return
  routes.forEach((item) => {
    if (!item.component) {
      item.component = 'BLANK'
    }
    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound) {
        item.component = layoutFound
      } else {
        item.component = dynamicImport(dynamicViewsModules, component)
      }
    } else if (name) {
      item.component = getParentLayout()
    }
    children && asyncImportRoute(children)
  })
}

function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '')
    const startFlag = component.startsWith('/')
    const endFlag =
      component.endsWith('.vue') ??
      component.endsWith('.jsx') ??
      component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.jsx` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return false
  } else {
    console.warn(`在src/views/下找不到${component}.vue, 或${component}.jsx, 请自行创建!`)
    return false
  }
}

// 后端数据转路由
export function transformObjToRoute(routeList) {
  routeList.forEach((route) => {
    const component = route.component
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      } else {
        route.children = [cloneDeep(route)]
        route.component = LAYOUT

        //某些情况下如果name如果没有值， 多个一级路由菜单会导致页面404
        if (!route.name) {
          console.warn('找不到菜单对应的name, 请检查数据!' + JSON.stringify(route))
        }
        route.name = `${route.name}Parent`
        // 重定向到当前路由，以防空白页面
        route.redirect = route.path
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    } else {
      console.warn('请正确配置路由：' + route?.name + '的component属性')
    }
    route.children && asyncImportRoute(route.children)
  })
  return routeList
}

// 路由降级
export function flatMultiLevelRoutes(routeModules) {
  const modules = cloneDeep(routeModules)

  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    // 判断级别是否 多级 路由
    if (!isMultipleRoute(routeModule)) {
      // 声明终止当前循环， 即跳过此次循环，进行下一轮
      continue
    }
    // 路由等级提升
    promoteRouteLevel(routeModule)
  }
  return modules
}

// 生成二级路由
function promoteRouteLevel(routeModule) {
  // Use vue-router to splice menus
  // 使用vue-router拼接菜单
  // createRouter 创建一个可以被 Vue 应用程序使用的路由实例
  let router = createRouter({
    routes: [routeModule],
    history: createWebHashHistory()
  })
  const routes = router.getRoutes()
  // 将所有子路由添加到二级路由
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  // omit lodash的函数 对传入的item对象的children进行删除
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

// 层级是否大于2
function isMultipleRoute(routeModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }

  const children = routeModule.children;

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

// 递归清洗后端数据
export function routerGenerator(routerMap) {
  // todo 提取树指定结构
  const list = treeMap(routerMap, {
    conversion: (node) => {
      if (node.redirect === 'noRedirect') {
        delete node.redirect
      }
      if (['Analysis', 'Workbench'].includes(node.name)) {
        node.meta = Object.assign({}, node.meta, { affix: true })
      }
      if (node.query) {
        node.meta.query = node.query
      }
      return {
        ...node,
      }
    }
  })

  return cloneDeep(list)
}
