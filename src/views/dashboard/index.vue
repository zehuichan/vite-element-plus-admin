<template>
  <el-input v-model="input" placeholder="Please input" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard'
})
</script>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style></style>
