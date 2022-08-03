<template>
  <el-header class="basic-layout-header">
    <div class="basic-layout-header__left">
      <trigger :sider="false" />
    </div>
    <div class="basic-layout-header__action"></div>
  </el-header>
  <tabs />
</template>

<script>
import { defineComponent } from 'vue'
import Trigger from '../Trigger/index.vue'
import Tabs from '../Tabs/index.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { Trigger, Tabs }
})
</script>

<style lang="scss">
.basic-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0;
}
</style>
