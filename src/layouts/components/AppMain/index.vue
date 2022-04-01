<template>
  <router-view v-slot="{Component, route}">
    <keep-alive>
      <component
        :is="Component"
        :key="key"
      />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => route.path)
</script>

<style scoped>

</style>