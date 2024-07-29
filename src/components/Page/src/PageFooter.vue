<template>
  <div class="page-footer" :style="{width: getCalcContentWidth}">
    <div class="flex" :class="{[`align-${align}`]: align, [`justify-${justify}`]: justify}">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

defineOptions({
  name: 'PageFooter',
  inheritAttrs: false
})

const props = defineProps({
  align: {
    type: String,
    default: 'top'
  },
  justify: {
    type: String,
    default: 'start'
  }
})

const { getCalcContentWidth } = useMenuSetting()
</script>

<style lang="scss">
.page-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, .06);
  box-shadow: 0 -6px 16px -8px rgba(0, 0, 0, .08), 0 -9px 28px 0 rgba(0, 0, 0, .05), 0 -12px 48px 16px rgba(0, 0, 0, .03);
  padding: 12px;

  .justify-start {
    justify-content: flex-start;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .justify-around {
    justify-content: space-around;
  }

  .justify-evenly {
    justify-content: space-evenly;
  }

  .align-center {
    align-items: center;
  }

  .align-bottom {
    align-items: flex-end;
  }
}
</style>
