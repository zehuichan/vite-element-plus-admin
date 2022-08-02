import { computed, unref } from 'vue'

import { useAppStore } from '@/store'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getMenuBackgroundColor = computed(
    () => appStore.getMenuSetting.backgroundColor
  )
  const getMenuTextColor = computed(() => appStore.getMenuSetting.textColor)
  const getMenuActiveTextColor = computed(
    () => appStore.getMenuSetting.activeTextColor
  )
  const getMenuWidth = computed(() => appStore.getMenuSetting.width)

  function setMenuSetting(menuSetting) {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed)
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,

    getMenuFixed,
    getCollapsed,
    getMenuBackgroundColor,
    getMenuTextColor,
    getMenuActiveTextColor,
    getMenuWidth
  }
}
