<template>
  <div class="basic-layout-multiple-header--placeholder"></div>
  <div
    :class="{
      'basic-layout-multiple-header': true,
      'basic-layout-multiple-header--fixed': true
    }"
  >
    <navbar />
    <tabs />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Navbar from '../Navbar/index.vue'
import Tabs from '../Tabs/index.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { Navbar, Tabs },
  setup() {
    const HEADER_HEIGHT = '48px'
    const TABS_HEIGHT = '44px'

    return {
      HEADER_HEIGHT,
      TABS_HEIGHT
    }
  }
})
</script>

<style lang="scss">
.basic-layout-multiple-header {
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
