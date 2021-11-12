import { defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './item'
import MenuLink from './link'
import { useExtractICSS } from '@/hooks'
import variables from '@/assets/scss/variables.scss'

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
      }
    }

    const renderMenu = () => {
      return h(
        'el-menu',
        {
          defaultActive: route?.path,
          mode: 'vertical',
          collapse: props.collapse,
        },
        () => props.routes.map((menu) => {
          return h(
            MenuItem,
            {
              item: menu
            },
            {
              default: (scope) => renderDefault(scope)
            }
          )
        })
      )
    }

    return () => {
      return h(
        'el-scrollbar',
        {
          'wrap-class': 'scrollbar-wrapper'
        },
        () => renderMenu()
      )
    }
  }
})

/**
 *
 * <el-scrollbar wrap-class="scrollbar-wrapper">
 <el-menu
 mode="vertical"
 unique-opened={false}
 collapse-transition={false}
 background-color="variables.backgroundColor"
 text-color="variables.textColor"
 active-text-color="variables.activeTextColor"
 >
 </el-menu>
 </el-scrollbar>
 */