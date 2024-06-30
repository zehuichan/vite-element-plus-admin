<template>
  <ul
    class="tabs-view-contextmenu"
    :style="{ left: x + 'px', top: y + 'px' }"
    @contextmenu.prevent.stop
  >
    <li
      v-for="item in getDropMenuList"
      :key="item.event"
      class="tabs-view-contextmenu-item"
      :class="{ 'tabs-view-contextmenu-item__disabled': item.disabled }"
      @click="handleMenuEvent(item)"
    >
      <icon-park :type="item.icon" />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent, reactive, unref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { TableActionEnum, useTabs } from '@/hooks/web/useTabs'

export default defineComponent({
  name: 'ContextMenu',
  props: {
    tabItem: Object,
    x: Number,
    y: Number
  },
  emits: ['click'],
  setup(props, { emit }) {
    const state = reactive({
      current: null,
      currentIndex: 0
    })

    const tabStore = useMultipleTabStore()
    const { currentRoute } = useRouter()
    const {
      refreshPage,
      closeAll,
      close,
      closeLeft,
      closeOther,
      closeRight,
      fullContent
    } = useTabs()

    const getTargetTab = computed(() => {
      return props.tabItem
    })

    const getDropMenuList = computed(() => {
      if (!unref(getTargetTab)) {
        return
      }
      const { meta } = unref(getTargetTab)
      const { path } = unref(currentRoute)

      const curItem = state.current

      const isCurItem = curItem ? curItem.path === path : false

      // Refresh button
      const index = state.currentIndex
      const refreshDisabled = !isCurItem
      // Close left
      const closeLeftDisabled = index === 0 || !isCurItem

      const disabled = tabStore.getTabList.length === 1

      // Close right
      const closeRightDisabled = !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0)

      return [
        {
          icon: 'refresh',
          event: TableActionEnum.REFRESH,
          text: '重新加载',
          disabled: refreshDisabled
        },
        {
          icon: 'full-screen',
          event: TableActionEnum.FULL_CONTENT,
          text: '专注模式',
          disabled: !isCurItem
        },
        {
          icon: 'close',
          event: TableActionEnum.CLOSE_CURRENT,
          text: '关闭标签页',
          disabled: !!meta?.affix || disabled
        },
        {
          icon: 'to-left',
          event: TableActionEnum.CLOSE_LEFT,
          text: '关闭左侧标签页',
          disabled: closeLeftDisabled
        },
        {
          icon: 'to-right',
          event: TableActionEnum.CLOSE_RIGHT,
          text: '关闭右侧标签页',
          disabled: closeRightDisabled
        },
        {
          icon: 'transfer-data',
          event: TableActionEnum.CLOSE_OTHER,
          text: '关闭其他标签页',
          disabled: disabled || !isCurItem
        },
        {
          icon: 'close-one',
          event: TableActionEnum.CLOSE_ALL,
          text: '关闭全部标签页',
          disabled: disabled
        }
      ]
    })

    watch(
      () => getTargetTab.value,
      (tabItem) => {
        if (!tabItem) return
        const index = tabStore.getTabList.findIndex(
          (tab) => tab.path === tabItem.path
        )
        state.current = tabItem
        state.currentIndex = index
      }
    )

    function handleMenuEvent(menu) {
      const { event, disabled } = menu
      if (disabled) return false

      switch (event) {
        case TableActionEnum.REFRESH:
          refreshPage()
          break
        case TableActionEnum.FULL_CONTENT:
          fullContent()
          break
        case TableActionEnum.CLOSE_CURRENT:
          close(props.tabItem)
          break
        case TableActionEnum.CLOSE_LEFT:
          closeLeft()
          break
        case TableActionEnum.CLOSE_RIGHT:
          closeRight()
          break
        case TableActionEnum.CLOSE_OTHER:
          closeOther()
          break
        case TableActionEnum.CLOSE_ALL:
          closeAll()
          break
      }

      emit('click')
    }

    return {
      getDropMenuList,
      handleMenuEvent
    }
  }
})
</script>

<style lang="scss">
.tabs-view-contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  &-item {
    margin: 0;
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    white-space: nowrap;

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
