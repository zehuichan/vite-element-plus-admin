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
      <app-locale-picker class="basic-layout-navbar-action__item" />
      <userinfo />
      <settings v-if="getShowSetting" />
    </div>
  </div>
</template>

<script setup>
import { AppLocalePicker } from '@/components/Application'
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

const { getShowBreadCrumb, getUseErrorHandle } = useRootSetting()
const { getShowSearch, getShowFullScreen, getShowNotice, getShowSetting } = useHeaderSetting()
</script>

<style lang="scss">
.basic-layout-navbar {
  overflow: hidden;
  height: 40px;
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
      align-items: center;
      justify-content: center;
      height: 40px;
      padding: 0 10px;
      cursor: pointer;

      .i-icon {
        font-size: 14px;
      }

      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>
