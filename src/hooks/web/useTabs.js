import { useRoute, useRouter } from 'vue-router'

import { useMultipleTabStore } from '@/store/modules/multipleTab'

export function useTabs() {
  const router = useRouter()
  const route = useRoute()
  const tabStore = useMultipleTabStore()

  async function closeLeftTabs(tab) {
    await tabStore.closeLeftTabs(tab || route)
  }

  async function closeAllTabs() {
    await tabStore.closeAllTabs(router)
  }

  async function closeRightTabs(tab) {
    await tabStore.closeRightTabs(tab || route)
  }

  async function closeOtherTabs(tab) {
    await tabStore.closeOtherTabs(tab || route)
  }

  async function closeCurrentTab(tab) {
    await tabStore.closeTab(tab || route, router)
  }

  async function pinTab(tab) {
    await tabStore.pinTab(tab || route)
  }

  async function unpinTab(tab) {
    await tabStore.unpinTab(tab || route)
  }

  async function toggleTabPin(tab) {
    await tabStore.toggleTabPin(tab || route)
  }

  async function refreshTab() {
    await tabStore.refresh(router)
  }

  async function openTabInNewWindow(tab) {
    await tabStore.openTabInNewWindow(tab || route)
  }

  async function closeTabByKey(key) {
    await tabStore.closeTabByKey(key, router)
  }

  async function setTabTitle(title) {
    tabStore.setUpdateTime()
    await tabStore.setTabTitle(route, title)
  }

  async function resetTabTitle() {
    tabStore.setUpdateTime()
    await tabStore.resetTabTitle(route)
  }

  function getTabDisableState(tab = route) {
    const tabs = tabStore.getTabs
    const affixTabs = tabStore.affixTabs
    const index = tabs.findIndex((item) => item.path === tab.path)
    const disabled = tabs.length <= 1

    const { meta } = tab
    const affixTab = meta?.affixTab ?? false
    const isCurrentTab = route.path === tab.path

    // 当前处于最左侧或者减去固定标签页的数量等于0
    const disabledCloseLeft = index === 0 || index - affixTabs.length <= 0 || !isCurrentTab

    const disabledCloseRight = !isCurrentTab || index === tabs.length - 1

    const disabledCloseOther = disabled || !isCurrentTab || tabs.length - affixTabs.length <= 1

    return {
      disabledCloseAll: disabled,
      disabledCloseCurrent: !!affixTab || disabled,
      disabledCloseLeft,
      disabledCloseOther,
      disabledCloseRight,
      disabledRefresh: !isCurrentTab,
    }
  }


  return {
    closeLeftTabs,
    closeAllTabs,
    closeRightTabs,
    closeOtherTabs,
    closeCurrentTab,
    pinTab,
    unpinTab,
    toggleTabPin,
    refreshTab,
    openTabInNewWindow,
    closeTabByKey,
    setTabTitle,
    resetTabTitle,
    getTabDisableState
  }
}
