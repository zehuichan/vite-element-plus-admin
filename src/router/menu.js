import { usePermissionStore } from '@/store/modules/permission'
import { getAllParentPath } from '@/router/menuHelper'
import { pathToRegexp } from 'path-to-regexp'
import { isHttpUrl } from '@/utils/is.js'

const staticMenus = []

async function getAsyncMenus() {
  const permissionStore = usePermissionStore()
  console.log(1, permissionStore.getBackMenuList)
  // 递归过滤所有隐藏的菜单
  const menuFilter = (items) => {
    return items.filter((item) => {
      const show = !item.meta?.hideMenu && !item.hideMenu
      if (show && item.children) {
        item.children = menuFilter(item.children)
      }
      return show
    })
  }
  menuFilter(permissionStore.getBackMenuList)
  console.log(2, staticMenus)
  return staticMenus
}

export const getMenus = async () => {
  const menus = await getAsyncMenus()
  console.log(3, menus)
  return menus
}

export async function getCurrentParentPath(currentPath) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

// Get the level 1 menu, delete children
export async function getShallowMenus() {
  const menus = await getAsyncMenus()
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }))
  return shallowMenuList
}

// Get the children of the menu
export async function getChildrenMenus(parentPath) {
  const menus = await getMenus()
  const parent = menus.find((item) => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return []
  }
  return parent.children
}

function basicFilter(routes) {
  return (menu) => {
    const matchRoute = routes.find((route) => {
      if (isHttpUrl(menu.path)) return true

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path)
      }
      const isSame = route.path === menu.path
      if (!isSame) return false

      if (route.meta?.ignoreAuth) return true

      return isSame || pathToRegexp(route.path).test(menu.path)
    })

    if (!matchRoute) return false
    menu.icon = menu.icon || matchRoute.meta.icon
    menu.meta = matchRoute.meta
    return true
  }
}
