<template>
  <div class="basic-layout-navbar">
    <div class="basic-layout-navbar-left">
      <trigger :sider="false" />
      <breadcrumb />
    </div>
    <div class="basic-layout-navbar-action"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Trigger from '../Trigger/index.vue'
import Breadcrumb from './breadcrumb.vue'

export default defineComponent({
  name: 'Navbar',
  components: { Trigger, Breadcrumb }
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
  }
}
</style>
