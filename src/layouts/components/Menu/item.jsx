import { computed, defineComponent, h } from 'vue'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import MenuItem from './item'

export default defineComponent({
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  setup(props, { slots }) {
    const item = computed(() => {
      return props.item.meta?.hidden ? undefined : props.item
    })

    const hasMultiChild = (item) => {
      return item.children
        ? item.children.filter((item) => !item.meta?.hidden).length > 1
        : false
    }

    return () => {
      if (item.value && !hasMultiChild(item.value)) {
        return h(
          ElMenuItem,
          { index: item.value.redirect || item.value.path },
          () => slots.default && slots.default(item.value)
        )
      } else if (item.value) {
        return h(
          ElSubMenu,
          { index: item.value.path },
          {
            title: () => slots.default && slots.default({ meta: item.value?.meta }),
            default: () => item.value?.children?.map((child) => {
              return h(
                MenuItem,
                { item: child },
                () => slots.default && slots.default(child)
              )
            }),
          }
        )
      } else {
        return undefined
      }
    }
  }
})