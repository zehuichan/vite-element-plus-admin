import { defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { ElMenu } from 'element-plus'
import MenuItem from './item'
import MenuLink from './link'

export default defineComponent({
  name: 'Menu',
  props: {
    routes: Array,
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    collapse: Boolean,
    collapseTransition: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const route = useRoute()

    const renderDefault = (item) => {
      if (slots.default) {
        return slots.default(item)
      } else {
        return h(
          MenuLink,
          { to: item.path },
          () => [
            item.meta?.icon && h(item.meta.icon),
            item.meta?.title && h('span', item.meta.title)
          ]
        )
      }
    }

    return () => h(
      'el-menu',
      {
        defaultActive: route?.path,
        mode: 'vertical',
        collapse: props.collapse
      },
      () => props.routes.map((menu) => h(
        MenuItem,
        {
          item: menu
        },
        {
          default: (scope) => renderDefault(scope)
        }
      ))
    )
  }
})