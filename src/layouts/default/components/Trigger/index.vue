<template>
  <SiderTrigger v-if="sider" />
  <HeaderTrigger v-else />
</template>

<script>
import { defineComponent } from 'vue'
import SiderTrigger from './SiderTrigger.vue'
import HeaderTrigger from './HeaderTrigger.vue'

export default defineComponent({
  name: 'Trigger',
  components: { SiderTrigger, HeaderTrigger },
  props: {
    sider: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss">
.trigger {
  display: flex;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: #f6f6f6;
  }

  .i-icon {
    font-size: 14px;
  }
}
</style>
