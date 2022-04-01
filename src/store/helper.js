import { Layout } from '@/router/constant'

export function asyncImportRoute(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }

    if (!tmp.component) {
      tmp.component = Layout
    } else {
      tmp.component = dynamicImport(route.component)
    }

    // 是否有子菜单，并递归处理
    if (route.children && route.children.length > 0) {
      tmp.children = asyncImportRoute(route.children)
    }

    res.push(tmp)
  })

  return res
}

function dynamicImport(component) {
  const dynamicViewsModules = import.meta.globEager('../views/**/*.{vue,jsx,tsx}')
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.jsx') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    )
    return false
  } else {
    console.warn(`${component} is not found`)
    return false
  }
}