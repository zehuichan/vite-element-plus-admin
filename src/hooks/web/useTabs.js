import { useRouter } from 'vue-router'
import { unref } from 'vue'

import { useAppStore } from '@/store/modules/app'
import { useMultipleTabStore } from '@/store/modules/multipleTab'

export const TableActionEnum = {
  REFRESH: 0,
  CLOSE_ALL: 1,
  CLOSE_LEFT: 2,
  CLOSE_RIGHT: 3,
  CLOSE_OTHER: 4,
  CLOSE_CURRENT: 5,
  CLOSE: 6,
  FULL_CONTENT: 7
}

export function useTabs(_router) {
  const appStore = useAppStore()

  function canIUseTabs() {
    const { show } = appStore.getMultiTabsSetting
    if (!show) {
      console.warn(
        'The multi-tab page is currently not open, please open it in the settings！'
      )
    }
    return !!show
  }

  const tabStore = useMultipleTabStore()
  const router = _router || useRouter()

  const { currentRoute, back } = router

  function getCurrentTab() {
    const route = unref(currentRoute)
    return tabStore.getTabList.find((item) => item.fullPath === route.fullPath)
  }

  async function updateTabTitle(title, tab) {
    const canIUse = canIUseTabs
    if (!canIUse) {
      return
    }
    const targetTab = tab || getCurrentTab()
    await tabStore.setTabTitle(title, targetTab)
  }

  async function updateTabPath(path, tab) {
    const canIUse = canIUseTabs()
    if (!canIUse) {
      return
    }
    const targetTab = tab || getCurrentTab()
    await tabStore.updateTabPath(path, targetTab)
  }

  async function handleTabAction(action, tab) {
    const canIUse = canIUseTabs()
    if (!canIUse) {
      return
    }
    const currentTab = getCurrentTab()
    switch (action) {
      case TableActionEnum.REFRESH:
        await tabStore.refreshPage(router)
        break

      case TableActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router)
        break

      case TableActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTabs(currentTab, router)
        break

      case TableActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTabs(currentTab, router)
        break

      case TableActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(currentTab, router)
        break

      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabStore.closeTab(tab || currentTab, router)
        break

      case TableActionEnum.FULL_CONTENT:
        const { fullContent } = appStore.getProjectConfig
        appStore.setProjectConfig({ fullContent: !fullContent })
        break
    }
  }

  return {
    refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TableActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TableActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
    close: (tab) => handleTabAction(TableActionEnum.CLOSE, tab),
    fullContent: () => handleTabAction(TableActionEnum.FULL_CONTENT),
    setTitle: (title, tab) => updateTabTitle(title, tab),
    updatePath: (fullPath, tab) => updateTabPath(fullPath, tab)
  }
}
