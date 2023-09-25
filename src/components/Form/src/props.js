export default {
  modelValue: {},
  labelPosition: {
    type: String,
    default: 'right'
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto'
  },
  schemas: [],
  baseColProps: {
    type: Object,
    default: () => ({ span: 6 })
  },
  size: String,
  disabled: Boolean,
  autoAdvancedLine: {
    type: Number,
    default: 1
  },
  alwaysShowLines: {
    type: Number,
    default: 1
  },
  showAdvancedButton: Boolean,
  rulesMessageJoinLabel: {
    type: Boolean,
    default: true
  },
  autoSubmitOnEnter: Boolean,
  autoSetPlaceHolder: {
    type: Boolean,
    default: true
  },
  autoFocusFirstItem: Boolean
}