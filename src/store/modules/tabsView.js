import { defineStore } from 'pinia'

export const useTabsViewStore = defineStore({
  id: 'tabs-view',
  state: () => ({
    visitedViews: []
  }),
  actions: {
    addTab(route) {
      // 添加标签页
      const isExists = this.visitedViews.some(
        (item) => item.fullPath == route.fullPath
      )
      if (isExists) return
      this.visitedViews.push(route)
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
