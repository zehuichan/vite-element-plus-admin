import { defineStore } from 'pinia'
import { getRawRoute } from '@/utils'

export const useTabsViewStore = defineStore({
  id: 'tabs-view',
  state: () => ({
    cacheTabList: new Set(),
    visitedViews: []
  }),
  getters: {
    getTabList() {
      return this.visitedViews
    },
    getCachedTabList() {
      return Array.from(this.cacheTabList)
    }
  },
  actions: {
    async updateCacheTab() {
      const cacheMap = new Set()

      for (const tab of this.visitedViews) {
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
