import { onKeyStroke } from '@vueuse/core'

import { tableContextKey } from '../constants'

export function useKeyboardModule() {
  const { internalData } = inject(tableContextKey)

  onKeyStroke(['ArrowUp'], (event) => {
    if (!internalData.isActivated) return
    console.log(event)
  })

  onKeyStroke(['ArrowDown'], (event) => {
    if (!internalData.isActivated) return
    console.log(event)
  })

  onKeyStroke(['ArrowLeft'], (event) => {
    if (!internalData.isActivated) return
    console.log(event)
  })

  onKeyStroke(['ArrowUp'], (event) => {
    if (!internalData.isActivated) return
    console.log(event)
  })

  onKeyStroke(['ArrowRight'], (event) => {
    if (!internalData.isActivated) return
    console.log(event)
  })
}
