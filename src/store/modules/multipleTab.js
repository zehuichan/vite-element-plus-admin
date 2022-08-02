import { unref } from 'vue'
import { defineStore } from 'pinia'
import { getRawRoute } from '@/utils'

import { useRedo } from '@/hooks/web/usePage'

export const useTabsViewStore = defineStore({
  id: 'multiple-tab',
  state: () => ({
    cacheTabList: new Set(),
    tabList: [],
    // Index of the last moved tab
    lastDragEndIndex: 0
  }),
  getters: {
    getTabList() {
      return this.tabList
    },
    getCachedTabList() {
      return Array.from(this.cacheTabList)
    },
    getLastDragEndIndex() {
      return this.lastDragEndIndex
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
      // 添加标签页
      const isExists = this.visitedViews.some(
        (item) => item.fullPath == route.fullPath
      )
      if (isExists) return
      this.visitedViews.push(route)
      this.updateCacheTab()
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
    closeCurrentTab(route) {
      // 关闭当前页
      const index = this.visitedViews.findIndex(
        (item) => item.fullPath == route.fullPath
      )
      this.visitedViews.splice(index, 1)
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
