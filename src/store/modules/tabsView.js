import { defineStore } from 'pinia'

const whiteList = ['login']

//保留固定路由
function retainAffixRoute(list) {
  return list.filter((item) => item?.meta?.affix ?? false)
}

export const useTabsViewStore = defineStore({
  id: 'tabs-view',
  state: () => ({
    cacheTabList: new Set(),
    tabList: []
  }),
  actions: {
    initTabs(routes) {
      // 初始化标签页
      this.tabList = routes
    },
    addTab(route) {
      // 添加标签页
      if (whiteList.includes(route.name)) return false
      const isExists = this.tabList.some(
        (item) => item.fullPath == route.fullPath
      )
      if (!isExists) {
        this.tabList.push(route)
      }
      return true
    },
    closeLeftTabs(route) {
      // 关闭左侧
      const index = this.tabList.findIndex(
        (item) => item.fullPath == route.fullPath
      )
      this.tabList = this.tabList.filter(
        (item, i) => i >= index || (item?.meta?.affix ?? false)
      )
    },
    closeRightTabs(route) {
      // 关闭右侧
      const index = this.tabList.findIndex(
        (item) => item.fullPath == route.fullPath
      )
      this.tabList = this.tabList.filter(
        (item, i) => i <= index || (item?.meta?.affix ?? false)
      )
    },
    closeOtherTabs(route) {
      // 关闭其他
      this.tabList = this.tabList.filter(
        (item) =>
          item.fullPath == route.fullPath || (item?.meta?.affix ?? false)
      )
    },
    closeCurrentTab(route) {
      // 关闭当前页
      const index = this.tabList.findIndex(
        (item) => item.fullPath == route.fullPath
      )
      this.tabList.splice(index, 1)
    },
    closeAllTabs() {
      // 关闭全部
      console.log(retainAffixRoute(this.tabList))
      this.tabList = retainAffixRoute(this.tabList)
    }
  }
})
