<script lang="jsx">
import { computed, defineComponent } from 'vue'

import { useVModel } from '@vueuse/core'

import { getDictDataLabel } from '@/hooks/web/useDict'

export default defineComponent({
  name: 'VcDesc',
  inheritAttrs: false,
  props: {
    modelValue: null,
    dictType: String,
    showOverflowTooltip: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '请填写',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {

    const state = useVModel(props, 'modelValue', emit)

    const inputValue = computed(() => {
      const { dictType } = props
      return dictType ? getDictDataLabel(dictType, state.value) : state.value
    })
    const tooltipDisabled = computed(() => {
      return !inputValue.value
    })

    const renderInput = () => {
      return props.border
        ? <el-input {...attrs} model-value={inputValue.value || '--'} placeholder={props.placeholder} readonly />
        : <div class="vc-desc ellipsis">{inputValue.value || '--'}</div>
    }

    return () => {
      const { showOverflowTooltip } = props

      if (showOverflowTooltip) {
        return (
          <el-tooltip disabled={tooltipDisabled.value} content={inputValue.value}>
            {renderInput()}
          </el-tooltip>
        )
      }

      return renderInput()
    }
  }
})
</script>

<style lang="scss">

</style>
