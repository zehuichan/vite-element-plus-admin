import { toRaw } from 'vue'
import { cloneDeep } from 'lodash-unified'
import { findPath, treeMap } from '@/utils/treeHelper'
import { isHttpUrl, isUrl } from '@/utils/is'

export function getAllParentPath(treeData, path) {
  const menuList = findPath(treeData, (n) => n.path === path)
  return (menuList || []).map((item) => item.path)
}

// 路径处理
function joinParentPath(menus, parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // 请注意，以 / 开头的嵌套路径将被视为根路径。
    // This allows you to leverage the component nesting without having to use a nested URL.
    // 这允许你利用组件嵌套，而无需使用嵌套 URL。
    if (!(menu.path.startsWith('/') || isHttpUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      // 路径不以 / 开头，也不是 url，加入父路径
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(
        menu.children,
        menu.meta?.hidePathForChildren ? parentPath : menu.path
      )
    }
  }
}

// Parsing the menu module
export function transformMenuModule(menuModule) {
  const { menu } = menuModule

  const menuList = [menu]

  joinParentPath(menuList)
  return menuList[0]
}

// 将路由转换成菜单
export function transformRouteToMenu(routeModList, routerMapping = false) {
  // 借助 lodash 深拷贝
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList = []

  // 对路由项进行修改
  cloneRouteModList.forEach((item) => {

    if (routerMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }

    item.meta = {
      ...item.meta,
      single: item.children && item.children.length === 1,
      hideMenu: item.hidden || false,
      hideBreadcrumb: item.hidden || false,
      ignoreKeepAlive: item.noCache || false,
    }

    if (item.meta.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })

  // 提取树指定结构
  const list = treeMap(routeList, {
    conversion: (node) => {
      const { meta: { hideMenu = false } = {}, name } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      }
    }
  })

  // 路径处理
  joinParentPath(list)
  return cloneDeep(list)
}

/**
 * config menu with given params
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g

export function configureDynamicParamsMenu(menu, params) {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath ? paramPath : path
  const matchArr = realPath.match(menuParamRegex)

  matchArr?.forEach((it) => {
    const realIt = it.substr(1)
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt])
    }
  })
  // save original param path.
  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path
  }
  menu.path = realPath
  // children
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params))
}
