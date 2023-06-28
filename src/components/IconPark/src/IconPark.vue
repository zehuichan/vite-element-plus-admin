<template>
  <component :class="spin ? 'i-icon-spin' : ''" :is="`icon-${name}`" v-bind="$attrs" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconPark',
  props: {
    name: String,
    spin: Boolean,
  }
})
</script>