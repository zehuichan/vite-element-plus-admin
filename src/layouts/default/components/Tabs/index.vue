<template>
  <div
    class="tabs-view"
    :class="{
      'tabs-view-fix': false,
      'tabs-view-fixed-header': false
    }"
  >
    <div class="tabs-view-main">
      <div
        ref="navWrap"
        class="tabs-card tabs-card-scrollable"
      >
        <div
          class="tabs-card-prev haptics-feedback"
          @click="scrollPrev"
        >
          <icon-park class="text-12px" type="left" />
        </div>
        <div
          class="tabs-card-next haptics-feedback"
          @click="scrollNext"
        >
          <icon-park class="text-12px" type="right" />
        </div>
        <div ref="navScroll" class="tabs-card-scroll">
          <draggable
            :list="getTabsState"
            animation="300"
            item-key="fullPath"
            class="flex"
            @end="handleSortTabs"
          >
            <template #item="{ element }">
              <router-link
                :id="`tag${element?.fullPath?.split('/').join('\/')}`"
                :class="{'tabs-card-scroll-item': true, 'active-item': activeKey === element.fullPath }"
                :to="{ path: element.path, query: element.query }"
                @contextmenu.prevent="handleContextMenu($event, element)"
              >
                <div class="tabs-card-scroll-item__inner">
                  <span>{{ element.meta.title }}</span>
                  <icon
                    v-show="!element.meta.affix && activeKey === element.fullPath"
                    name="CloseBold"
                    @click.prevent.stop="handleClose(element)"
                  />
                </div>
              </router-link>
            </template>
          </draggable>
        </div>
      </div>
      <div class="tabs-extra">
        <div class="tabs-card-item haptics-feedback" @click="fullContent">
          <icon-park class="text-12px " type="screenshot-one" />
        </div>
        <div class="tabs-card-item haptics-feedback" @click="refreshPage">
          <icon-park class="text-12px " type="undo" />
        </div>
      </div>
    </div>
    <context-menu
      ref="contextmenu"
      v-show="showDropdown"
      :tab-item="currentTab"
      :x="dropdownX"
      :y="dropdownY"
      @click="showDropdown = false"
    />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  toRaw,
  toRefs,
  unref,
} from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useRoute, useRouter } from 'vue-router'

import Draggable from 'vuedraggable'
import ContextMenu from './context-menu.vue'

import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'

import { useGo } from '@/hooks/web/usePage'
import { useTabs } from '@/hooks/web/useTabs'

import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'

import { listenerRouteChange } from '@/install/plugins/router-change'

export default defineComponent({
  name: 'AppTabs',
  components: {
    Draggable,
    ContextMenu
  },
  setup() {
    const navWrap = ref(null)
    const navScroll = ref(null)
    const contextmenu = ref(null)
    const currentTab = ref(null)
    const affixList = ref([])

    const userStore = useUserStore()
    const tabStore = useMultipleTabStore()

    const router = useRouter()
    const route = useRoute()

    const { refreshPage, close, fullContent } = useTabs()

    const state = reactive({
      activeKey: route.fullPath,
      scrollable: false,
      dropdownX: 0,
      dropdownY: 0,
      showDropdown: false,
      isMultiHeaderFixed: false,
      multiTabsSetting: true
    })

    // 标签页列表
    const getTabsState = computed(() => tabStore.getTabList)

    listenerRouteChange((route) => {
      const { name } = route
      if (
        name === REDIRECT_NAME ||
        route.name === PAGE_NOT_FOUND_NAME ||
        !route ||
        !userStore.getToken
      ) {
        return
      }

      const { path, fullPath, meta = {} } = route
      const { currentActiveMenu, hideTab } = meta
      const isHide = !hideTab ? null : currentActiveMenu
      const p = isHide || fullPath || path
      if (state.activeKey !== p) {
        state.activeKey = p
      }

      if (isHide) {
        const findParentRoute = router
          .getRoutes()
          .find((item) => item.path === currentActiveMenu)

        findParentRoute && tabStore.addTab(findParentRoute)
      } else {
        tabStore.addTab(unref(route))
      }

      updateNavScroll(true)
    })

    function filterAffixTabs(routes) {
      const tabs = []
      routes &&
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push(toRaw(route))
        }
      })
      return tabs
    }

    function initAffixTabs() {
      affixList.value = filterAffixTabs(router.getRoutes())
      for (const tab of affixList.value) {
        tab.name && tabStore.addTab({
          meta: tab.meta,
          name: tab.name,
          path: tab.path,
        })
      }
    }

    function scrollTo(value, amplitude) {
      const currentScroll = navScroll.value.scrollLeft
      const scrollWidth =
        (amplitude > 0 && currentScroll + amplitude >= value) ||
        (amplitude < 0 && currentScroll + amplitude <= value)
          ? value
          : currentScroll + amplitude
      navScroll.value && navScroll.value.scrollTo(scrollWidth, 0)
      if (scrollWidth === value) return
      return window.requestAnimationFrame(() => scrollTo(value, amplitude))
    }

    function scrollPrev() {
      const containerWidth = navScroll.value.offsetWidth
      const currentScroll = navScroll.value.scrollLeft

      if (!currentScroll) return
      const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
    }

    function scrollNext() {
      const containerWidth = navScroll.value.offsetWidth
      const navWidth = navScroll.value.scrollWidth
      const currentScroll = navScroll.value.scrollLeft

      if (navWidth - currentScroll <= containerWidth) return
      const scrollLeft =
        navWidth - currentScroll > containerWidth * 2
          ? currentScroll + containerWidth
          : navWidth - containerWidth
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
    }

    async function updateNavScroll(autoScroll) {
      await nextTick()
      if (!navScroll.value) return
      const containerWidth = navScroll.value.offsetWidth
      const navWidth = navScroll.value.scrollWidth

      if (containerWidth < navWidth) {
        state.scrollable = true
        if (autoScroll) {
          let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || [];
          [...tagList].forEach((tag) => {
            // fix SyntaxError
            if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
              tag.scrollIntoView && tag.scrollIntoView()
            }
          })
        }
      } else {
        state.scrollable = false
      }
    }

    function handleClose(item) {
      close(item)
    }

    async function handleContextMenu(e, item) {
      await updateNavScroll()
      state.showDropdown = false
      currentTab.value = null
      await nextTick()
      const menuMinWidth = 105
      const offsetLeft = navWrap.value.getBoundingClientRect().left // container margin left
      const offsetWidth = navWrap.value.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        state.dropdownX = maxLeft
      } else {
        state.dropdownX = left
      }

      state.showDropdown = true
      state.dropdownY = e.clientY
      currentTab.value = item
    }

    function handleSortTabs(evt) {
      const { oldIndex, newIndex } = evt
      if (oldIndex === newIndex) {
        return
      }
      tabStore.sortTabs()
    }

    onClickOutside(contextmenu, () => (state.showDropdown = false))

    onMounted(() => {
      initAffixTabs()
      updateNavScroll(true)
    })

    return {
      ...toRefs(state),
      navWrap,
      navScroll,
      contextmenu,
      currentTab,
      getTabsState,

      refreshPage,
      fullContent,
      scrollPrev,
      scrollNext,
      handleClose,
      handleContextMenu,
      handleSortTabs
    }
  }
})
</script>

<style lang="scss">
.tabs-view {
  width: 100%;
  padding: 6px 10px;
  display: flex;
  transition: all 0.2s ease-in-out;
  background-color: #f4f7f9;

  &-main {
    display: flex;
    max-width: 100%;
    min-width: 100%;

    .tabs-card {
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      &.tabs-card-scrollable {
        padding: 0 32px;
        overflow: hidden;
      }

      .tabs-card-prev,
      .tabs-card-next {
        position: absolute;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        background-color: #fff;
      }

      .tabs-card-prev {
        left: 0;
      }

      .tabs-card-next {
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;

        &-item {
          flex-shrink: 0;
          position: relative;
          cursor: pointer;
          height: 32px;
          line-height: 32px;
          border: 1px solid #f0f0f0;
          color: #1f2225;
          background: #fff;
          padding: 0 8px;
          font-size: 12px;
          border-radius: 2px;
          margin-left: 6px;

          &:hover {
            color: #515a6e;
          }

          &__inner {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .el-icon {
            width: 16px;
            height: 16px;
            margin-left: 8px;
          }
        }

        .active-item {
          color: #fff;
          background: #0960bd;
          border: 0;
        }
      }
    }

    .tabs-extra {
      display: flex;

      .tabs-card-item {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        background-color: #fff;
      }
    }
  }
}

.tabs-view-default-background {
  background: #f5f7f9;
}

.tabs-view-dark-background {
  background: #101014;
}

.tabs-view-fix {
  position: fixed;
  z-index: 5;
  padding: 6px 19px 6px 10px;
  left: 200px;
}

.tabs-view-fixed-header {
  top: 0;
}
</style>
