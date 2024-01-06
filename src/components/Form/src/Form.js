export const formProps = {
  modelValue: {
    type: Object,
    default: () => ({})
  },
  labelPosition: {
    type: String,
    default: 'left'
  },
  labelWidth: {
    type: [Number, String],
    default: 'auto'
  },
  schemas: {
    type: [Array],
    default: () => []
  },
  baseColProps: {
    type: Object,
    default: () => ({ span: 6 })
  },
  size: String,
  disabled: Boolean,
  rulesMessageJoinLabel: {
    type: Boolean,
    default: true
  },
  autoSubmitOnEnter: Boolean,
  autoSetPlaceHolder: {
    type: Boolean,
    default: true
  },
  autoFocusFirstItem: Boolean,
}

export const formEmits = ['update:modelValue', 'register', 'enter']
