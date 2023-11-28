import { nextTick, unref, watchEffect } from 'vue'

export async function useAutoFocus({
                                     getSchema,
                                     getProps,
                                     formElRef,
                                     isInitedDefault
                                   }) {
  watchEffect(async () => {
    if (unref(isInitedDefault) || !unref(getProps).autoFocusFirstItem) {
      return
    }
    await nextTick()
    const schemas = unref(getSchema)
    const formEl = unref(formElRef)
    const el = formEl?.$el
    if (!formEl || !el || !schemas || schemas.length === 0) {
      return
    }

    const firstItem = schemas[0]
    // Only open when the first form item is input type
    if (!firstItem.component || !firstItem.component.includes('Input')) {
      return
    }

    const inputEl = el.querySelector('.el-row:first-child input')
    if (!inputEl) return
    inputEl?.focus()
  })
}
