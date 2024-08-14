import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { store } from '..'

import { openWindow } from '@/utils'

export const useMultipleTabStore = defineStore({
  id: 'multiple-tab',
  persist: [
    {
      paths: ['tabs'],
      storage: sessionStorage,
    },
  ],
  state: () => ({
    cachedTabs: new Set(),
    dragEndIndex: 0,
    excludeCachedTabs: new Set(),
    renderRouteView: true,
    tabs: [],
    updateTime: Date.now(),
  }),
  getters: {
    affixTabs() {
      const affixTabs = this.tabs.filter((tab) => isAffixTab(tab))
      return affixTabs.sort((a, b) => {
        const orderA = a.meta?.affixTabOrder ?? 0
        const orderB = b.meta?.affixTabOrder ?? 0
        return orderA - orderB
      })
    },
    getCachedTabs() {
      return [...this.cachedTabs]
    },
    getExcludeCachedTabs() {
      return [...this.excludeCachedTabs]
    },
    getTabs() {
      const normalTabs = this.tabs.filter((tab) => !isAffixTab(tab))
      return [...this.affixTabs, ...normalTabs].filter(Boolean)
    },
  },
  actions: {
    async _bulkCloseByPaths(paths) {
      this.tabs = this.tabs.filter((item) => {
        return !paths.includes(getTabPath(item))
      })

      this.updateCacheTab()
    },
    _close(tab) {
      const { fullPath } = tab
      if (isAffixTab(tab)) {
        return
      }
      const index = this.tabs.findIndex((item) => item.fullPath === fullPath)
      index !== -1 && this.tabs.splice(index, 1)
    },
    async _goToDefaultTab(router) {
      if (this.getTabs.length <= 0) {
        // TODO: 跳转首页
        return
      }
      const firstTab = this.getTabs[0]
      if (firstTab) {
        await this._goToTab(firstTab, router)
      }
    },
    async _goToTab(tab, router) {
      const { params, path, query } = tab
      const toParams = {
        params: params || {},
        path,
        query: query || {},
      }
      await router.replace(toParams)
    },
    addTab(routeTab) {
      const tab = cloneTab(routeTab)
      if (!isTabShown(tab)) {
        return
      }

      const tabIndex = this.tabs.findIndex((tab) => {
        return getTabPath(tab) === getTabPath(routeTab)
      })

      if (tabIndex === -1) {
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const maxNumOfOpenTab = routeTab?.meta?.maxNumOfOpenTab ?? -1
        // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
        // 获取到已经打开的动态路由数, 判断是否大于某一个值
        if (
          maxNumOfOpenTab > 0 &&
          this.tabs.filter((tab) => tab.name === routeTab.name).length >= maxNumOfOpenTab
        ) {
          // 关闭第一个
          const index = this.tabs.findIndex(
            (item) => item.name === routeTab.name,
          )
          index !== -1 && this.tabs.splice(index, 1)
        }
        this.tabs.push(tab)
      } else {
        // 页面已经存在，不重复添加选项卡，只更新选项卡参数
        const currentTab = toRaw(this.tabs)[tabIndex]
        const mergedTab = { ...currentTab, ...tab }
        if (currentTab && Reflect.has(currentTab.meta, 'affixTab')) {
          mergedTab.meta.affixTab = currentTab.meta.affixTab
        }
        this.tabs.splice(tabIndex, 1, mergedTab)
      }
      this.updateCacheTab()
    },
    async closeAllTabs(router) {
      this.tabs = this.tabs.filter((tab) => isAffixTab(tab))
      await this._goToDefaultTab(router)
      this.updateCacheTab()
    },
    async closeLeftTabs(tab) {
      const index = this.tabs.findIndex(
        (item) => getTabPath(item) === getTabPath(tab),
      )

      if (index < 1) {
        return
      }

      const leftTabs = this.tabs.slice(0, index)
      const paths = []

      for (const item of leftTabs) {
        if (!isAffixTab(item)) {
          paths.push(getTabPath(item))
        }
      }
      await this._bulkCloseByPaths(paths)
    },
    async closeOtherTabs(tab) {
      const closePaths = this.tabs.map((item) => getTabPath(item))

      const paths = []

      for (const path of closePaths) {
        if (path !== tab.fullPath) {
          const closeTab = this.tabs.find((item) => getTabPath(item) === path)
          if (!closeTab) {
            continue
          }
          if (!isAffixTab(closeTab)) {
            paths.push(getTabPath(closeTab))
          }
        }
      }
      await this._bulkCloseByPaths(paths)
    },
    async closeRightTabs(tab) {
      const index = this.tabs.findIndex(
        (item) => getTabPath(item) === getTabPath(tab),
      )

      if (index >= 0 && index < this.tabs.length - 1) {
        const rightTabs = this.tabs.slice(index + 1)

        const paths = []
        for (const item of rightTabs) {
          if (!isAffixTab(item)) {
            paths.push(getTabPath(item))
          }
        }
        await this._bulkCloseByPaths(paths)
      }
    },
    async closeTab(tab, router) {
      const { currentRoute } = router

      // 关闭不是激活选项卡
      if (getTabPath(currentRoute.value) !== getTabPath(tab)) {
        this._close(tab)
        this.updateCacheTab()
        return
      }
      const index = this.getTabs.findIndex(
        (item) => getTabPath(item) === getTabPath(currentRoute.value),
      )

      const before = this.getTabs[index - 1]
      const after = this.getTabs[index + 1]

      // 下一个tab存在，跳转到下一个
      if (after) {
        this._close(currentRoute.value)
        await this._goToTab(after, router)
        // 上一个tab存在，跳转到上一个
      } else if (before) {
        this._close(currentRoute.value)
        await this._goToTab(before, router)
      } else {
        console.error('Failed to close the tab; only one tab remains open.')
      }
    },
    async closeTabByKey(key, router) {
      const originKey = decodeURIComponent(key)
      const index = this.tabs.findIndex(
        (item) => getTabPath(item) === originKey,
      )
      if (index === -1) {
        return
      }

      const tab = this.tabs[index]
      if (tab) {
        await this.closeTab(tab, router)
      }
    },
    getTabByPath(path) {
      return this.getTabs.find((item) => getTabPath(item) === path)
    },
    async openTabInNewWindow(tab) {
      const { hash, origin } = location
      const path = tab.fullPath || tab.path
      const fullPath = path.startsWith('/') ? path : `/${path}`
      const url = `${origin}${hash ? '/#' : ''}${fullPath}`
      openWindow(url, { target: '_blank' })
    },
    async pinTab(tab) {
      const index = this.tabs.findIndex(
        (item) => getTabPath(item) === getTabPath(tab),
      )
      if (index !== -1) {
        tab.meta.affixTab = true
        // this.addTab(tab);
        this.tabs.splice(index, 1, tab)
      }
    },
    async refresh(router) {
      const { currentRoute } = router
      const { name } = currentRoute.value

      this.excludeCachedTabs.add(name)
      this.renderRouteView = false

      await new Promise((resolve) => setTimeout(resolve, 200))

      this.excludeCachedTabs.delete(name)
      this.renderRouteView = true
    },
    async resetTabTitle(tab) {
      if (!tab?.meta?.newTabTitle) {
        return
      }
      const findTab = this.tabs.find(
        (item) => getTabPath(item) === getTabPath(tab),
      )
      if (findTab) {
        findTab.meta.newTabTitle = undefined
        await this.updateCacheTab()
      }
    },
    setAffixTabs(tabs) {
      for (const tab of tabs) {
        tab.meta.affixTab = true
        this.addTab(routeToTab(tab))
      }
    },
    async setTabTitle(tab, title) {
      const findTab = this.tabs.find(
        (item) => getTabPath(item) === getTabPath(tab),
      )

      if (findTab) {
        findTab.meta.newTabTitle = title

        await this.updateCacheTab()
      }
    },
    setUpdateTime() {
      this.updateTime = Date.now()
    },
    async sortTabs(oldIndex, newIndex) {
      const currentTab = this.tabs[oldIndex]
      if (!currentTab) {
        return
      }
      this.tabs.splice(oldIndex, 1)
      this.tabs.splice(newIndex, 0, currentTab)
      this.dragEndIndex = this.dragEndIndex + 1
    },
    async toggleTabPin(tab) {
      const affixTab = tab?.meta?.affixTab ?? false

      await (affixTab ? this.unpinTab(tab) : this.pinTab(tab))
    },
    async unpinTab(tab) {
      const index = this.tabs.findIndex(
        (item) => getTabPath(item) === getTabPath(tab),
      )

      if (index !== -1) {
        tab.meta.affixTab = false
        // this.addTab(tab);
        this.tabs.splice(index, 1, tab)
      }
    },
    async updateCacheTab() {
      const cacheMap = new Set()

      for (const tab of this.tabs) {
        // 跳过不需要持久化的标签页
        const keepAlive = tab.meta?.keepAlive
        if (!keepAlive) {
          continue
        }
        tab.matched.forEach((t, i) => {
          if (i > 0) {
            cacheMap.add(t.name)
          }
        })

        const name = tab.name
        cacheMap.add(name)
      }
      this.cachedTabs = cacheMap
    },
  }
})

function cloneTab(route) {
  if (!route) {
    return route
  }
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: matched
      ? matched.map((item) => ({
        meta: item.meta,
        name: item.name,
        path: item.path,
      }))
      : undefined
  }
}

function isAffixTab(tab) {
  return tab?.meta?.affixTab ?? false
}

function isTabShown(tab) {
  return !tab.meta.hideInTab
}

function getTabPath(tab) {
  return decodeURIComponent(tab.fullPath || tab.path)
}

function routeToTab(route) {
  return {
    meta: route.meta,
    name: route.name,
    path: route.path,
  }
}


// Need to be used outside the setup
export function useMultipleTabStoreWithOut() {
  return useMultipleTabStore(store)
}
