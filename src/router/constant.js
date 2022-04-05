import Layout from '@/layouts/index.vue'
import Blank from '@/layouts/blank.vue'

const LayoutMap = new Map()

LayoutMap.set('LAYOUT', Layout)
LayoutMap.set('BLANK', Blank)

export {
  Layout
}

export default LayoutMap