<template>
  <svg
    :class="[classPrefix, 'iconfont']"
    :style="{ fontSize: addUnit(size) }"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VSvgIcon',
  props: {
    name: String,
    classPrefix: String,
    size: [String, Number]
  },
  setup() {
    const addUnit = (value) => {
      return isNumeric(value) ? `${value}px` : String(value)
    }

    const isNumeric = (val) => {
      return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
    }

    return {
      addUnit
    }
  }
})
</script>

<style>
.iconfont {
  width: 1em;
  height: 1em;
  min-width: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
