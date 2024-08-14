<template>
  <ul
    class="tabs-view-contextmenu"
    :style="{ left: x + 'px', top: y + 'px' }"
    @contextmenu.prevent.stop
  >
    <li
      v-for="item in getDropMenuList"
      :key="item.key"
      class="tabs-view-contextmenu-item"
      :class="{ 'tabs-view-contextmenu-item__disabled': item.disabled }"
      @click="item.handler"
    >
      <component is="icon-park" :key="item.icon" :type="item.icon" />
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent } from 'vue'

import { useRoute } from 'vue-router'

import { useAppStore } from '@/store/modules/app'
import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useTabs } from '@/hooks/web/useTabs'

export default defineComponent({
  name: 'ContextMenu',
  props: {
    tabItem: String,
    x: Number,
    y: Number
  },
  emits: ['click'],
  setup(props, { emit }) {
    const route = useRoute()

    const appStore = useAppStore()
    const tabStore = useMultipleTabStore()

    const {
      closeAllTabs,
      closeCurrentTab,
      closeLeftTabs,
      closeOtherTabs,
      closeRightTabs,
      getTabDisableState,
      openTabInNewWindow,
      refreshTab,
      toggleTabPin,
    } = useTabs()

    const currentActive = computed(() => {
      return props.tabItem || route.fullPath
    })

    const getDropMenuList = computed(() => {
      const tab = tabStore.getTabByPath(currentActive.value)
      const { fullContent } = appStore.getProjectConfig

      const {
        disabledCloseAll,
        disabledCloseCurrent,
        disabledCloseLeft,
        disabledCloseOther,
        disabledCloseRight,
        disabledRefresh,
      } = getTabDisableState(tab)

      const affixTab = tab?.meta?.affixTab ?? false

      return [
        {
          disabled: disabledCloseCurrent,
          handler: async () => {
            await closeCurrentTab(tab)
            emit('click')
          },
          icon: 'close',
          key: 'close',
          text: '关闭',
        },
        {
          handler: async () => {
            await toggleTabPin(tab)
            emit('click')
          },
          icon: affixTab ? 'pushpin' : 'pin',
          key: 'affix',
          text: affixTab ? '取消固定' : '固定',
        },
        {
          handler: () => {
            appStore.setProjectConfig({ fullContent: !fullContent })
            emit('click')
          },
          icon: 'full-screen',
          key: 'affix',
          text: '最大化',
        },
        {
          disabled: disabledRefresh,
          handler: () => {
            refreshTab()
            emit('click')
          },
          icon: 'refresh',
          key: 'reload',
          text: '重新加载',
        },
        {
          handler: async () => {
            await openTabInNewWindow(tab)
            emit('click')
          },
          icon: 'efferent-three',
          key: 'reload',
          text: '在新窗口打开',
        },
        {
          disabled: disabledCloseLeft,
          handler: async () => {
            await closeLeftTabs(tab)
            emit('click')
          },
          icon: 'to-left',
          key: 'close-left',
          text: '关闭左侧标签页',
        },
        {
          disabled: disabledCloseRight,
          handler: async () => {
            await closeRightTabs(tab)
            emit('click')
          },
          icon: 'to-right',
          key: 'close-right',
          text: '关闭右侧标签页',
        },
        {
          disabled: disabledCloseOther,
          handler: async () => {
            await closeOtherTabs(tab)
            emit('click')
          },
          icon: 'transfer-data',
          key: 'close-other',
          text: '关闭其他标签页',
        },
        {
          disabled: disabledCloseAll,
          handler: ()=>{
            closeAllTabs()
            emit('click')
          },
          icon: 'close-one',
          key: 'close-all',
          text: '关闭全部标签页',
        }
      ]
    })

    return {
      getDropMenuList,
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
