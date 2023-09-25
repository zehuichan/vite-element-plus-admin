import { computed, unref } from 'vue'

import { omit } from 'lodash-es'

export function usePagination(propsRef) {
  const getPaginationProps = computed(() => {
    return omit(unref(propsRef), ['columns', 'data'])
  })

  return {
    getPaginationProps
  }
}
