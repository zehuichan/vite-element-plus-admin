<template>
  <el-col v-bind="getColProps">
    <el-form-item v-bind="getFormItemProps">
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}" />
      </template>
    </el-form-item>
  </el-col>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { colProps, formItemProps } from 'element-plus'
import { pick } from 'lodash-es'

export default defineComponent({
  name: 'Field',
  props: {
    ...colProps,
    ...formItemProps,
    span: {
      type: Number,
      default: 6
    }
  },
  setup(props) {
    const getColProps = computed(() => {
      return pick(props, Object.keys(colProps))
    })

    const getFormItemProps = computed(() => {
      return pick(props, Object.keys(formItemProps))
    })

    return {
      getColProps,
      getFormItemProps
    }
  }
})
</script>

<style lang="scss">

</style>