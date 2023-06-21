<template>
  <div class="app-container">
    <div class="w-100px h-100px p-10px text-white bg-amber" @click="handleClick">unocss</div>
    <div class="p-5px mt-[10px] bg-[#b2a8bb]">unocss</div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

function handleClick() {
  router.go(0)
}
</script>

<style lang="scss"></style>
