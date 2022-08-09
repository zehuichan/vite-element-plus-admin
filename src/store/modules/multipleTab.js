import { toRaw, unref } from 'vue'
import { defineStore } from 'pinia'

import { getRawRoute } from '@/utils'
import { Cache, MULTIPLE_TABS_KEY } from '@/utils/cache'

import { useRedo } from '@/hooks/web/usePage'

import projectSetting from '@/settings/projectSetting'

const cacheTab = projectSetting.multiTabsSetting.cache

export const useMultipleTabStore = defineStore({
  id: 'multiple-tab',
  state: () => ({
    cacheTabList: new Set(),
    tabList: cacheTab ? Cache.getItem(MULTIPLE_TABS_KEY) : []
  }),
  getters: {
    getTabList() {
      return this.tabList
    },
    getCachedTabList() {
      return Array.from(this.cacheTabList)
    }
  },
  actions: {
    async updateCacheTab() {
      const cacheMap = new Set()

      for (const tab of this.tabList) {
        const item = getRawRoute(tab)
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive
        if (!needCache) {
          continue
        }
        const { name } = item
        cacheMap.add(name)
      }
      this.cacheTabList = cacheMap
    },
    clearCacheTabs() {
      this.cacheTabList = new Set()
    },
    resetState() {
      this.tabList = []
      this.clearCacheTabs()
    },
    async refreshPage(router) {
      const { currentRoute } = router
      const route = unref(currentRoute)
      const { name } = route

      const findTab = this.getCachedTabList.find((item) => item === name)
      if (findTab) {
        this.cacheTabList.delete(findTab)
      }
      const redo = useRedo(router)
      await redo()
    },
    addTab(route) {
      const { path, fullPath, params, query, meta } = getRawRoute(route)

      let updateIndex = -1
      // Existing pages, do not add tabs repeatedly
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })

      // If the tab already exists, perform the update operation
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        if (!curTab) {
          return
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        // Add tab
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel = meta?.dynamicLevel ?? -1
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? ''
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.tabList.filter((e) => e.meta?.realPath ?? '' === realPath)
              .length >= dynamicLevel
          ) {
            // 关闭第一个
            const index = this.tabList.findIndex(
              (item) => item.meta.realPath === realPath
            )
            index !== -1 && this.tabList.splice(index, 1)
          }
        }
        this.tabList.push(route)
      }
      this.updateCacheTab()
      cacheTab && Cache.setItem(MULTIPLE_TABS_KEY, this.tabList)
    },
    async closeTab(tab, route) {
      // 关闭当前页
      const index = this.visitedViews.findIndex(
        (item) => item.fullPath == route.fullPath
      )
      this.visitedViews.splice(index, 1)
    },
    closeLeftTabs(route) {
      // 关闭左侧
      const index = this.visitedViews.findIndex(
        (item) => item.fullPath == route.fullPath
      )
      this.visitedViews = this.visitedViews.filter(
        (item, i) => i >= index || (item?.meta?.affix ?? false)
      )
    },
    closeRightTabs(route) {
      // 关闭右侧
      const index = this.visitedViews.findIndex(
        (item) => item.fullPath == route.fullPath
      )
      this.visitedViews = this.visitedViews.filter(
        (item, i) => i <= index || (item?.meta?.affix ?? false)
      )
    },
    closeOtherTabs(route) {
      // 关闭其他
      this.visitedViews = this.visitedViews.filter(
        (item) =>
          item.fullPath == route.fullPath || (item?.meta?.affix ?? false)
      )
    },
    closeAllTabs() {
      // keep affix tags
      const affixTags = state.visitedViews.filter(
        (tag) => tag?.meta?.affix ?? false
      )
      this.visitedViews = affixTags
    }
  }
})
