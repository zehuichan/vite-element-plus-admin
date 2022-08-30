<template>
  <div class="basic-layout-multiple-header--placeholder" v-if="getFixed"></div>
  <div
    :class="{
      'basic-layout-multiple-header': true,
      'basic-layout-multiple-header--fixed': getFixed
    }"
    :style="getWrapStyle"
  >
    <navbar />
    <tabs />
  </div>
</template>

<script>
import { computed, defineComponent, unref } from 'vue'
import Navbar from '../Navbar/index.vue'
import Tabs from '../Tabs/index.vue'

import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useAppInjectStore } from '@/hooks/web/useAppProvideStore'

const HEADER_HEIGHT = '48px'
const TABS_HEIGHT = '38px'

export default defineComponent({
  name: 'AppHeader',
  components: { Navbar, Tabs },
  setup() {
    const { getCalcContentWidth } = useMenuSetting()
    const { getFixed } = useHeaderSetting()

    const { getIsMobile } = useAppInjectStore()

    const getWrapStyle = computed(() => {
      const style = {}
      if (unref(getFixed)) {
        style.width = unref(getIsMobile) ? '100%' : unref(getCalcContentWidth)
      }
      return style
    })

    return {
      HEADER_HEIGHT,
      TABS_HEIGHT,

      getFixed,
      getWrapStyle
    }
  }
})
</script>

<style lang="scss">
.basic-layout-multiple-header {
  transition: width 0.2s;
  flex: 0 0 auto;

  &--placeholder {
    height: calc(v-bind(HEADER_HEIGHT) + v-bind(TABS_HEIGHT));
  }

  &--fixed {
    position: fixed;
    top: 0;
    z-index: 505;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  }
}
</style>
