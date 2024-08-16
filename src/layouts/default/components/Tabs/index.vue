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
            :list="currentTabs"
            animation="300"
            item-key="fullPath"
            class="flex"
            @end="handleSortTabs"
          >
            <template #item="{ element }">
              <router-link
                class="tabs-card-scroll-item"
                active-class="active-item"
                :id="`tag${element?.fullPath?.split('/').join('\/')}`"
                :key="`tag${element?.fullPath?.split('/').join('\/')}`"
                :to="element"
                @contextmenu.prevent="handleContextMenu($event, element)"
              >
                <div class="tabs-card-scroll-item__inner">
                  <span>{{ element.meta.title }}</span>
                  <icon-park
                    v-show="!element.meta.affixTab && currentTabs.length > 1"
                    type="close"
                    @click.prevent.stop="closeTabByKey(element.fullPath)"
                  />
                  <icon-park
                    v-show="element.meta.affixTab && currentTabs.length > 1"
                    type="pushpin"
                    @click.prevent.stop="unpinTab(element)"
                  />
                </div>
              </router-link>
            </template>
          </draggable>
        </div>
      </div>
      <div class="tabs-extra">
        <div class="tabs-card-item haptics-feedback" @click="fullContent">
          <icon-park class="text-12px " type="full-screen" />
        </div>
        <div class="tabs-card-item haptics-feedback" @click="refreshTab">
          <icon-park class="text-12px " type="undo" />
        </div>
      </div>
    </div>
    <context-menu
      ref="contextmenu"
      v-show="state.showDropdown"
      :tab-item="currentTab"
      :x="state.dropdownX"
      :y="state.dropdownY"
      @click="state.showDropdown = false"
    />
  </div>
</template>

<script setup>
import { nextTick, reactive, ref, watch, } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useRoute, useRouter } from 'vue-router'

import Draggable from 'vuedraggable'
import ContextMenu from './context-menu.vue'

import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useMultipleTabStore } from '@/store/modules/multipleTab'

import { useTabs } from '@/hooks/web/useTabs'
import { filter } from '@/utils/treeHelper'

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const tabStore = useMultipleTabStore()

const router = useRouter()
const route = useRoute()

const { refreshTab, closeTabByKey, unpinTab } = useTabs()

const navWrap = ref(null)
const navScroll = ref(null)
const contextmenu = ref(null)
const currentTab = ref(null)
const currentTabs = ref([])
const state = reactive({
  activeKey: route.fullPath,
  scrollable: false,
  dropdownX: 0,
  dropdownY: 0,
  showDropdown: false,
  isMultiHeaderFixed: false,
  multiTabsSetting: true
})

watch(
  [
    () => tabStore.getTabs,
    () => tabStore.updateTime,
  ],
  ([tabs]) => {
    currentTabs.value = tabs
  },
)

watch(
  () => permissionStore.getBackMenuList,
  () => {
    initAffixTabs()
  },
  { immediate: true },
)

watch(
  () => route.path,
  () => {
    const meta = route.matched?.[route.matched.length - 1]?.meta
    tabStore.addTab({
      ...route,
      meta: meta || route.meta,
    })
  },
  { immediate: true },
)

function initAffixTabs() {
  const affixTabs = filter(router.getRoutes(), (route) => {
    return !!route.meta?.affixTab
  })
  tabStore.setAffixTabs(affixTabs)
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

function fullContent() {
  const { fullContent } = appStore.getProjectConfig
  appStore.setProjectConfig({ fullContent: !fullContent })
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
  currentTab.value = item.fullPath
}

function handleSortTabs(evt) {
  const { oldIndex, newIndex } = evt
  if (oldIndex === newIndex) {
    return
  }
  tabStore.sortTabs()
}

onClickOutside(contextmenu, () => (state.showDropdown = false))
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
        padding: 0 28px;
        overflow: hidden;
      }

      .tabs-card-prev,
      .tabs-card-next {
        position: absolute;
        width: 28px;
        height: 28px;
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
          line-height: 24px;
          color: #1f2225;
          background: #fff;
          padding: 2px 6px;
          font-size: 12px;
          margin-left: 6px;
          border-radius: 2px;

          &:hover {
            color: #515a6e;
          }

          &__inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 80px;
          }

          .i-icon {
            margin-left: 8px;
            line-height: 1;
          }
        }

        .active-item {
          color: #fff;
          background: theme('colors.primary');
          border: 0;

          .i-icon {
            color: #fff;
          }
        }
      }
    }

    .tabs-extra {
      display: flex;

      .tabs-card-item {
        width: 28px;
        height: 28px;
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
