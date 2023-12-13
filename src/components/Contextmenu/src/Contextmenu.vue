<template>
  <ul
    ref="wrapRef"
    v-if="showRef"
    class="contextmenu"
    :style="getStyle"
    @contextmenu.prevent.stop
  >
    <li
      v-for="item in visibleItems"
      :key="item.event"
      class="contextmenu-item"
      :class="{ 'contextmenu-item__disabled': item.disabled }"
      @click="handleAction(item, $event)"
    >
      <icon-park v-if="item.icon" :name="item.icon" />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, unref } from 'vue'

export default defineComponent({
  name: 'Contextmenu',
  props: {
    width: {
      type: Number,
      default: 156
    },
    customEvent: {
      type: Object,
      default: null
    },
    styles: {
      type: Object
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    axis: {
      // The position of the right mouse button click
      type: Object,
      default() {
        return { x: 0, y: 0 }
      },
    },
    items: {
      // The most important list, if not, will not be displayed
      type: Array,
      default() {
        return []
      },
    },
  },
  setup(props) {
    const wrapRef = ref(null)
    const showRef = ref(false)

    const visibleItems = computed(() => {
      const { items } = props
      return items.filter((item) => !item.hidden)
    })

    const getStyle = computed(() => {
      const { axis, items, styles, width } = props
      const { x, y } = axis || { x: 0, y: 0 }
      const menuHeight = (items || []).length * 40
      const menuWidth = width
      const body = document.body

      const left = body.clientWidth < x + menuWidth ? x - menuWidth : x
      const top = body.clientHeight < y + menuHeight ? y - menuHeight : y
      return {
        position: 'absolute',
        width: `${width}px`,
        left: `${left + 1}px`,
        top: `${top + 1}px`,
        zIndex: 9999,
        ...styles, // Not the first, fix options.styles.width not working
      }
    })

    function handleAction(item, e) {
      const { handler, disabled } = item
      if (disabled) {
        return
      }
      showRef.value = false
      e?.stopPropagation()
      e?.preventDefault()
      handler?.()
    }

    onMounted(() => {
      nextTick(() => (showRef.value = true))
    })

    onUnmounted(() => {
      const el = unref(wrapRef)
      el && document.body.removeChild(el)
    })

    return {
      wrapRef,
      showRef,
      visibleItems,
      getStyle,
      handleAction
    }
  }
})
</script>

<style lang="scss">
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: var(--el-box-shadow-dark);

  .contextmenu-item {
    margin: 0;
    padding: 4px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 22px;

    &:hover {
      background: #eee;
    }

    .i-icon {
      margin-right: 8px;
      font-size: 14px;
    }

    &__disabled {
      color: #ccc;
      cursor: not-allowed;

      &:hover {
        background: #fff;
      }
    }
  }
}
</style>
