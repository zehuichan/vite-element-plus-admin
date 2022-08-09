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
        class="tabs-card"
        :class="{ 'tabs-card-scrollable': state.scrollable }"
      >
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable
            :list="getTabsState"
            animation="300"
            item-key="fullPath"
            class="flex"
          >
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item"
                :class="{ 'active-item': state.activeKey === element.path }"
                @click.stop="handleClick(element)"
              >
                <span>{{ element.meta.title }}</span>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, unref, watch } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import Draggable from 'vuedraggable'

import { useMultipleTabStore, useUserStore } from '@/store'

import { useGo } from '@/hooks/web/usePage'

import { REDIRECT_NAME } from '@/router/constant'

export default defineComponent({
  name: 'AppTabs',
  components: {
    Draggable
  },
  setup() {
    const navScroll = ref(null)
    const navWrap = ref(null)
    const activeKeyRef = ref('')

    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()

    const route = useRoute()
    const router = useRouter()
    const go = useGo()

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
    const getTabsState = computed(() => {
      return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
    })
    console.log(getTabsState.value)

    watch(
      () => route.fullPath,
      () => {
        const { name } = route
        if (name === REDIRECT_NAME || !route || !userStore.getToken) {
          return
        }

        const { path, fullPath, meta = {} } = route
        const { currentActiveMenu, hideTab } = meta
        const isHide = !hideTab ? null : currentActiveMenu
        const p = isHide || fullPath || path
        if (activeKeyRef.value !== p) {
          activeKeyRef.value = p
        }

        if (isHide) {
          const findParentRoute = router
            .getRoutes()
            .find((item) => item.path === currentActiveMenu)

          findParentRoute && tabStore.addTab(findParentRoute)
        } else {
          tabStore.addTab(unref(route))
        }
      },
      { immediate: true }
    )

    const handleClick = (e) => {
      const { fullPath } = e
      if (fullPath === route.fullPath) return
      state.activeKey = fullPath
      go(state.activeKey, true)
    }

    return {
      state,
      getTabsState,

      handleClick
    }
  }
})
</script>

<style lang="scss">
.tabs-view {
  width: 100%;
  padding: 6px 0;
  display: flex;
  transition: all 0.2s ease-in-out;

  &-main {
    height: 32px;
    display: flex;
    max-width: 100%;
    min-width: 100%;

    .tabs-card {
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;

        .n-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
        }
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
          background: #fff;
          color: #1f2225;
          height: 32px;
          padding: 6px 16px 4px;
          border-radius: 3px;
          margin-right: 6px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          flex: 0 0 auto;

          span {
            float: left;
            vertical-align: middle;
          }

          &:hover {
            color: #515a6e;
          }

          .n-icon {
            height: 22px;
            width: 21px;
            margin-right: -6px;
            position: relative;
            vertical-align: middle;
            text-align: center;
            color: #808695;

            &:hover {
              color: #515a6e !important;
            }

            svg {
              height: 21px;
              display: inline-block;
            }
          }
        }

        .active-item {
          color: #2d8cf0;
        }
      }
    }

    .tabs-card-scrollable {
      padding: 0 32px;
      overflow: hidden;
    }
  }

  .tabs-close {
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: var(--color);
    border-radius: 2px;
    cursor: pointer;

    &-btn {
      color: var(--color);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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
