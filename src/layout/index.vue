<template>
  <div class="next-layout layout-has-sider pro-layout">
    <router-view/>{{width}}{{height}}
  </div>
</template>

<script>
  // hooks
  import useResize from '@/hooks/use-resize'

  export default {
    name: 'index',
    setup() {
      const {width, height} = useResize()

      return {
        width,
        height
      }
    }
  }
</script>

<style scoped>

</style>