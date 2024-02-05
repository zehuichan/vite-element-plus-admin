<template>
  <div class="basic-layout-navbar">
    <div class="basic-layout-navbar-left">
      <trigger :sider="false" />
      <breadcrumb v-if="getShowBreadCrumb" />
    </div>
    <div class="basic-layout-navbar-action">
      <error-action v-if="getUseErrorHandle" />
      <query v-if="getShowSearch" />
      <screenfull v-if="getShowFullScreen" />
      <notification v-if="getShowNotice" />
      <userinfo />
      <settings v-if="getShowSetting" />
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
import Query from './query.vue'
import Screenfull from './screenfull.vue'
import ErrorAction from './error-action.vue'

import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'

export default defineComponent({
  name: 'Navbar',
  components: {
    Screenfull,
    Query,
    Settings,
    Trigger,
    Breadcrumb,
    Notification,
    Userinfo,
    ErrorAction
  },
  setup() {
    const { getShowBreadCrumb, getUseErrorHandle } = useRootSetting()
    const { getShowSearch, getShowFullScreen, getShowNotice, getShowSetting } =
      useHeaderSetting()

    return {
      getShowBreadCrumb,
      getUseErrorHandle,
      getShowSearch,
      getShowFullScreen,
      getShowNotice,
      getShowSetting
    }
  }
})
</script>

<style lang="scss">
.basic-layout-navbar {
  overflow: hidden;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  &-left {
    float: left;
    display: flex;
    height: 100%;
    align-items: center;
  }

  &-action {
    float: right;
    display: flex;
    align-items: center;

    &__item {
      color: #000000d9;
      display: flex;
      height: 48px;
      padding: 0 10px;
      cursor: pointer;
      align-items: center;

      .el-icon {
        font-size: 16px;
      }

      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>
