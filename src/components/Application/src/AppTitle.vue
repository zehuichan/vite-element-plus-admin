<template>
  <div class="app-title">
    <div class="app-title__label" v-if="label">
      {{ label }}
    </div>
    <div class="app-title__value">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppTitle',
  props: {
    label: String
  }
})
</script>

<style lang="scss">
.app-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 8px;
  padding-left: 12px;

  .app-title__label {
    line-height: 24px;
  }

  .app-title__value {
    line-height: 24px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -6px;
    width: 4px;
    height: 12px;
    background-color: theme('colors.primary');
    border-radius: 2px;
  }
}
</style>
