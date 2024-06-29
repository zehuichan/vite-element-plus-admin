import { nextTick, watch } from 'vue'
import { useEventListener, useMagicKeys } from '@vueuse/core'

let axis = '0,0'
const vNodes = new Map()
// binding.value
// {x: 0, y: 0}
// {x: 1, y: 0}
// {x: 2, y: 0}
// {x: 3, y: 0}
// {x: 0, y: 1}
// {x: 1, y: 1}
// {x: 2, y: 1}
// {x: 3, y: 1}
const magicFocusDirective = {
  mounted(el, binding, vNode) {

    vNodes.set(`${binding.value.x},${binding.value.y}`, vNode.el.querySelector('input, textarea'))

    useEventListener(vNode.el, 'focusin', (evt) => {
      axis = `${binding.value.x},${binding.value.y}`
    })

    const { arrowleft, arrowup, arrowright, arrowdown, enter } = useMagicKeys({ target: el })

    const moveFocus = (nextX, nextY) => {
      const nextInput = vNodes.get(`${nextX},${nextY}`)
      if (!nextInput) {
        console.log('nextInput is undefined')
        return
      }
      if (nextInput.disabled) {
        console.log('nextInput is disabled')
        return
      }
      console.log(nextInput)
      nextTick(() => {
        nextInput.focus()
      })
    }


    watch(enter, (val) => {
      if (val) {
        moveFocus(binding.value.x + 1, binding.value.y)
      }
    })

    watch(arrowright, (val) => {
      if (val) {
        moveFocus(binding.value.x + 1, binding.value.y)
      }
    })

    watch(arrowleft, (val) => {
      if (val) {
        moveFocus(binding.value.x - 1, binding.value.y)
      }
    })

    watch(arrowdown, (val) => {
      if (val) {
        moveFocus(binding.value.x, binding.value.y + 1)
      }
    })

    watch(arrowup, (val) => {
      if (val) {
        moveFocus(binding.value.x, binding.value.y - 1)
      }
    })
  },
  beforeUnmount(el, binding, vNode) {
    vNodes.delete(el)
  }
}

export function setupMagicFocusDirective(app) {
  app.directive('magic-focus', magicFocusDirective)
}

export default magicFocusDirective


