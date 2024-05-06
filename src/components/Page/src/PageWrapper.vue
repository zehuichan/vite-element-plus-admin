<template>
  <div class="page-wrapper" v-bind="$attrs">
    <el-page-header
      v-if="getShowHeader"
      @back="closeCurrent"
    >
      <template #content>
        <slot name="headerContent">
          {{ content }}
        </slot>
      </template>
      <template #[item]="data" v-for="item in getHeaderSlots">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </el-page-header>
    <div class="page-content">
      <slot />
    </div>
    <page-footer v-if="getShowFooter" justify="end">
      <slot name="footer" />
    </page-footer>
  </div>
</template>

<script setup>
import { computed, useAttrs, useSlots } from 'vue'
import { omit } from 'lodash-unified'
import { useTabs } from '@/hooks/web/useTabs'

defineOptions({
  name: 'PageWrapper',
  inheritAttrs: false
})

const props = defineProps({
  title: String,
  content: String,
  notice: Boolean,
})

const attrs = useAttrs()
const slots = useSlots()

const { closeCurrent } = useTabs()

const getShowHeader = computed(
  () => props.content || slots?.headerContent || props.title || getHeaderSlots.value.length,
)

const getShowFooter = computed(() => slots?.footer)

const getHeaderSlots = computed(() => {
  return Object.keys(omit(slots, 'default', 'footer', 'headerContent'))
})
</script>

<style lang="scss">
.page-wrapper {
  position: relative;

  .el-page-header__header {
    height: 48px;
    padding: 0 12px;
    background: #FFFFFF;
  }

  .page-content {
  }
}
</style>
