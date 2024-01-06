export const searchProps = {
  schemas: {
    type: [Array],
    default: () => []
  },
  baseColProps: {
    type: Object,
    default: () => ({ span: 6 })
  },
  autoAdvancedLine: {
    type: Number,
    default: 3
  },
  alwaysShowLines: {
    type: Number,
    default: 2
  },
  showAdvancedButton: Boolean,
}

export const searchEmits = ['search', 'reset', 'advanced-change']
