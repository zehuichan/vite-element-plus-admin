<template>
  <div class="next-layout layout-has-sider pro-layout">
    <router-view/>
    <v-footer :copyright="copyright"/>
  </div>
</template>

<script>
  // settings
  import defaultSettings from '@/settings'

  export default {
    name: 'Layout',
    computed: {
      copyright() {
        return defaultSettings.copyright
      }
    }
  }
</script>

<style scoped>

</style>