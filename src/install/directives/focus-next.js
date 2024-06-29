function isVisible(node) {
  if (getComputedStyle(node).visibility === 'hidden') {
    return false
  }
  while (node !== document.body) {
    if (node.style.display === 'none' || node.style.opacity === '0') {
      return false
    }
    node = node.parentNode
  }
  return true
}

function isAvailableNode(node) {
  if (
    node.tagName === 'INPUT'
    && !node.disabled
    && isVisible(node)
    && !['submit', 'reset', 'file', 'hidden', 'checkbox', 'radio'].includes(node.type)
  ) {
    return true
  } else if (
    node.tagName === 'TEXTAREA'
    && !node.disabled
  ) {
    return true
  }
  return false
}

function findFirstAvailableInput(rootDom, selector) {
  let nodes = [...rootDom.querySelectorAll(selector)]

  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i]
    if (['INPUT', 'TEXTAREA'].includes(node.tagName)) {
      if (isAvailableNode(node)) {
        return node
      }
    } else {
      let childNodes = node.querySelectorAll('input, textarea')
      let childNode = [...childNodes].find(node => isAvailableNode(node))
      if (childNode) {
        return childNode
      }
    }
  }
  return null
}

function findAllInputs(rootDom, selector) {
  return [...rootDom.querySelectorAll(selector)].reduce(function(nodes, node) {
    if (['INPUT', 'TEXTAREA'].includes(node.tagName)) {
      if (isAvailableNode(node)) {
        nodes.push(node)
      }
      return nodes
    }
    let childNodes = [...node.querySelectorAll('input, textarea')].filter(node => isAvailableNode(node))
    if (childNodes.length) {
      nodes.push(...childNodes)
      return nodes
    }
    return nodes
  }, [])
}

function autoFocus(rootDom, binding) {
  let selector = binding.value || 'input, textarea'
  let node = findFirstAvailableInput(rootDom, selector)
  if (node) {
    node.focus()
  }
}

function findNextNode(rootDom, targetNode, binding) {
  let selector = binding.value || 'input, textarea'
  let nodes = findAllInputs(rootDom, selector)
  let isByCompare = false
  let index = nodes.findIndex((item, index) => {
    if (item === targetNode || item.contains(targetNode)) {
      return true
    }
    if (targetNode.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_FOLLOWING) {
      isByCompare = true
      return true
    }
    return false
  })
  if (isByCompare) {
    return nodes[index]
  } else {
    if (index === -1 || index === nodes.length - 1) {
      return null
    }
    return nodes[index + 1]
  }
}

function findPrevNode(rootDom, targetNode, binding) {
  let selector = binding.value || 'input, textarea'
  let nodes = findAllInputs(rootDom, selector)
  let isByCompare = false
  let index = nodes.findIndex((item, index) => {
    if (item === targetNode || item.contains(targetNode)) {
      return true
    }
    if (targetNode.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_PRECEDING) {
      isByCompare = true
      return true
    }
    return false
  })
  if (isByCompare) {
    return nodes[index]
  } else {
    if (index === -1 || index === 0) {
      return null
    }
    return nodes[index - 1]
  }
}

const focusNextDirective = {
  mounted(el, binding, vNode) {
    if (binding.modifiers.autoFocus) {
      autoFocus(vNode.el, binding)
    }

    // keyCode 13: Enter, 39: Right, 37: Left
    function keyDown(event) {
      let targetNode = event.target

      if (event.keyCode === 13 || event.keyCode === 39) {
        let nextNode = findNextNode(vNode.el, targetNode, binding)
        if (!nextNode) {
          return
        }

        // 延迟操作是避免当一个input元素后面是textarea时，在input里面输入回车，如果直接将textarea聚焦
        // 则会在textarea中产生一个回车空行
        setTimeout(() => {
          nextNode.focus()
        })
      }

      if (event.keyCode === 37) {
        let prevNode = findPrevNode(vNode.el, targetNode, binding)
        console.log(prevNode)
        if (!prevNode) {
          return
        }

        // 延迟操作是避免当一个input元素后面是textarea时，在input里面输入回车，如果直接将textarea聚焦
        // 则会在textarea中产生一个回车空行
        setTimeout(() => {
          prevNode.focus()
        })
      }
    }

    el.addEventListener('keydown', keyDown)
    el.__FOCUS_NEXT_KEYDOWN_HANDLER__ = keyDown
  },
  beforeUnmount(el, binding, vNode) {
    el.removeEventListener('keydown', el.__FOCUS_NEXT_KEYDOWN_HANDLER__)
  },
}


export function setupFocusNextDirective(app) {
  app.directive('focus-next', focusNextDirective)
}

export default focusNextDirective
