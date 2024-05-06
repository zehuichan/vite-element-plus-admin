import { intersection } from 'lodash-unified'

import { useUserStore } from '@/store/modules/user'

import { isArray } from '@/utils/is'

const ALL = '*:*:*'

export function usePermission() {

  function hasPermission(value, def = true) {
    const userStore = useUserStore()
    // Visible by default
    if (!value) {
      return def
    }
    const allCodeList = userStore.getPermissions

    if (!isArray(value)) {
      return allCodeList.includes(value)
    }

    return allCodeList.includes(ALL) || intersection(value, allCodeList).length > 0
  }

  return {
    hasPermission
  }
}
