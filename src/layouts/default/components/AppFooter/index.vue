<template>
  <el-footer class="basic-layout-footer">
    <div>Copyright &copy; {{ info }}</div>
  </el-footer>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter',
  setup() {
    return {
      info: import.meta.env.VITE_GLOB_APP_FOOTER
    }
  }
})
</script>

<style lang="scss">
.basic-layout-footer {
  text-align: center;
  padding: 24px 50px 80px;
  color: #000000d9;
  font-size: 14px;
  height: auto;
}
</style>
