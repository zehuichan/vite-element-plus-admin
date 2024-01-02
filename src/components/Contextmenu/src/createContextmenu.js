import { createVNode, render } from 'vue'
import contextmenuVue from './Contextmenu.vue'
import { isClient } from '@/utils/is'
import { noop } from '@/utils'

const menuManager = {
  domList: [],
  resolve: noop,
}

export const createContextmenu = function(options) {
  const { event } = options || {}

  event && event?.preventDefault()

  if (!isClient) {
    return
  }
  return new Promise((resolve) => {
    const body = document.body

    const container = document.createElement('div')
    const propsData = {}
    if (options.styles) {
      propsData.styles = options.styles
    }

    if (options.items) {
      propsData.items = options.items
    }

    if (options.event) {
      propsData.customEvent = event
      propsData.axis = { x: event.clientX, y: event.clientY }
    }

    const vm = createVNode(contextmenuVue, propsData)
    render(vm, container)

    menuManager.domList.push(container)

    const remove = function() {
      menuManager.domList.forEach((dom) => {
        try {
          dom && body.removeChild(dom)
        } catch (error) {
          //
        }
      })
    }

    menuManager.resolve = function(arg) {
      remove()
      resolve(arg)
    }
    remove()
    body.appendChild(container)
  })
}

export const destroyContextmenu = function() {
  if (menuManager) {
    menuManager.resolve('')
    menuManager.domList = []
  }
}
