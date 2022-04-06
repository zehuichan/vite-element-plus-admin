import Layout from '@/layouts/index.vue'
import Blank from '@/layouts/blank.vue'

const getParentLayout = (_name) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout',
      })
    })
}

const LayoutMap = new Map()

LayoutMap.set('LAYOUT', Layout)
LayoutMap.set('BLANK', Blank)

export {
  Layout,
  getParentLayout
}

export default LayoutMap