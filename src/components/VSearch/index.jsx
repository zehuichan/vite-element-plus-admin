import './index.scss'

const VSearch = {
  name: 'VSearch',
  props: {
    modelValue: {
      type: Object,
      default() {
        return {}
      },
    },
    options: {
      type: Array,
      default: () => [],
      required: true
    },
    // 阈值
    threshold: {
      type: [String, Number],
      default: 8
    }
  },

  emits: [
    'update:modelValue'
  ],

  setup(props, {emit, slots}) {

    const onSearch = () => {
      emit('update:modelValue', {...props.modelValue})
      emit('change', {...props.modelValue})
      emit('search', {...props.modelValue})
    }
    const onReset = () => {
      emit('update:modelValue', {...props.modelValue})
      emit('change', {...props.modelValue})
      emit('reset', {...props.modelValue})
    }

    return () => {
      return (
        <div class="v-search">
          el-form
          <div class="base-form-tools clearfix">
            <div class="fl">
              <el-button type="primary" icon="el-icon-search" onClick={onSearch}>查询</el-button>
              <el-button type="default" icon="el-icon-refresh" onClick={onReset}>重置</el-button>
              {slots.tools}
            </div>
            {slots.extra && <div className="extra fr">{slots.extra}</div>}
          </div>
        </div>
      )
    }
  }
}


export default VSearch