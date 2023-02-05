<template>
  <div class="logo" @click="goHome">
    <img src="/element-plus-logo.svg" alt="" :class="{ 'mr-2': !collapse }" />
    <div v-show="!collapse" class="title">PlusAdmin</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useGo } from '@/hooks/web/usePage'

export default defineComponent({
  name: 'AppLogo',
  props: {
    collapse: Boolean
  },
  setup() {
    const go = useGo()

    function goHome() {
      go('/dashboard')
    }

    return {
      goHome
    }
  }
})
</script>

<style lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  img {
    width: auto;
    height: 32px;
  }

  .title {
    color: #fff;
  }

  .mr-2 {
    margin-right: 0.5rem;
  }
}
</style>
