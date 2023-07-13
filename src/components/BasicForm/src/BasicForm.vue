<template>
  <el-form ref="formElRef" v-bind="getBindValue" :validate-on-rule-change="false">
    <el-row v-bind="getRow">
      <slot />
    </el-row>
  </el-form>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import { formProps, rowProps } from 'element-plus'
import { pick } from 'lodash-es'

export default defineComponent({
  inheritAttrs: false,
  name: 'BasicForm',
  props: {
    ...formProps,
    ...rowProps,
    gutter: {
      type: Number,
      default: 20
    }
  },
  setup(props) {

    const { proxy } = getCurrentInstance()

    const formElRef = ref()

    const getRow = computed(() => {
      return pick(props, Object.keys(rowProps))
    })

    const getBindValue = computed(() => {
      return pick(props, Object.keys(formProps))
    })

    onMounted(() => {
      const entries = Object.entries(formElRef.value)
      for (const [key, value] of entries) {
        proxy[key] = value
      }
    })

    return {
      formElRef,
      getRow,
      getBindValue
    }
  }
})
</script>

<style lang="scss">

</style>