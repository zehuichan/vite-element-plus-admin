<template>
  <el-icon>
    <component :is="name" />
  </el-icon>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: String
  }
})
</script>
