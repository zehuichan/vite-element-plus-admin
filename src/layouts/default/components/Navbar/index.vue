<template>
  <div class="basic-layout-navbar">
    <div class="basic-layout-navbar-left">
      <trigger :sider="false" />
      <breadcrumb />
    </div>
    <div class="basic-layout-navbar-action">
      <search />
      <notification />
      <screenfull />
      <userinfo />
      <settings />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Trigger from '../Trigger/index.vue'
import Breadcrumb from './breadcrumb.vue'
import Notification from './notification.vue'
import Userinfo from './userinfo.vue'
import Settings from './settings.vue'
import Search from './search.vue'
import Screenfull from './screenfull.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    Screenfull,
    Search,
    Settings,
    Trigger,
    Breadcrumb,
    Notification,
    Userinfo
  }
})
</script>

<style lang="scss">
.basic-layout-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  &-left {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &-action {
    display: flex;
    min-width: 180px;
    align-items: center;

    &__item {
      color: #000000d9;
      display: flex;
      height: 48px;
      padding: 0 10px;
      cursor: pointer;
      align-items: center;

      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>
