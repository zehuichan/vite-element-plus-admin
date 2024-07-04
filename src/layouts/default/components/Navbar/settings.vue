<template>
  <div class="basic-layout-navbar-action__item" @click="visible = true">
    <icon-park type="config" />
  </div>
  <el-drawer size="260px" append-to-body :with-header="false" v-model="visible">
    <div class="drawer-container">
      <h3 class="drawer-title">界面显示</h3>
      <div class="drawer-item">
        <span>面包屑</span>
        <el-switch v-model="breadCrumb" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>标签页</span>
        <el-switch v-model="multipleTab" class="drawer-switch" />
      </div>
      <div class="drawer-item" v-if="false">
        <span>Logo</span>
        <el-switch v-model="logo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>页脚</span>
        <el-switch v-model="footer" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>搜索</span>
        <el-switch v-model="search" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>全屏</span>
        <el-switch v-model="fullscreen" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>消息</span>
        <el-switch v-model="notice" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>设置</span>
        <el-switch v-model="setting" class="drawer-switch" />
      </div>
      <h3 class="drawer-title">界面功能</h3>
      <div class="drawer-item">
        <span>固定Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

export default defineComponent({
  name: 'Settings',
  setup() {
    const { setRootSetting, getShowBreadCrumb, getShowLogo, getShowFooter } = useRootSetting()
    const {
      setHeaderSetting,
      getFixed,
      getShowSearch,
      getShowFullScreen,
      getShowNotice,
      getShowSetting
    } = useHeaderSetting()
    const { setMultipleTabSetting, getShowMultipleTab } = useMultipleTabSetting()

    const visible = ref(false)

    const breadCrumb = computed({
      get() {
        return getShowBreadCrumb.value
      },
      set(val) {
        setRootSetting({
          showBreadCrumb: val
        })
      }
    })

    const multipleTab = computed({
      get() {
        return getShowMultipleTab.value
      },
      set(val) {
        setMultipleTabSetting({
          show: val
        })
      }
    })

    const logo = computed({
      get() {
        return getShowLogo.value
      },
      set(val) {
        setRootSetting({
          showLogo: val
        })
      }
    })

    const footer = computed({
      get() {
        return getShowFooter.value
      },
      set(val) {
        setRootSetting({
          showFooter: val
        })
      }
    })

    const search = computed({
      get() {
        return getShowSearch.value
      },
      set(val) {
        setHeaderSetting({
          showSearch: val
        })
      }
    })

    const fullscreen = computed({
      get() {
        return getShowFullScreen.value
      },
      set(val) {
        setHeaderSetting({
          showFullScreen: val
        })
      }
    })

    const notice = computed({
      get() {
        return getShowNotice.value
      },
      set(val) {
        setHeaderSetting({
          showNotice: val
        })
      }
    })

    const setting = computed({
      get() {
        return getShowSetting.value
      },
      set(val) {
        setHeaderSetting({
          showSetting: val
        })
      }
    })

    const fixedHeader = computed({
      get() {
        return getFixed.value
      },
      set(val) {
        setHeaderSetting({
          fixed: val
        })
      }
    })

    return {
      visible,

      breadCrumb,
      multipleTab,
      logo,
      footer,
      search,
      fullscreen,
      notice,
      setting,

      fixedHeader
    }
  }
})
</script>

<style lang="scss">
.drawer-container {
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
