<template>
  <div class="logo">Logo</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
})
</script>

<style>
.logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: padding .3s cubic-bezier(.645, .045, .355, 1);
}
</style>