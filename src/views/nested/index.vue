<template>
  <div>
    <div class="app-header">
      <el-page-header @back="goBack" />
    </div>
    <div class="app-container">
      <code>
        {{ $route.meta }}
      </code>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped></style>
