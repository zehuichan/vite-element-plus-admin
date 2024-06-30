export const tableProps = {
  tableKey: {
    type: [String, Number],
    default: '0'
  },
  columns: {
    type: Array,
    default: () => []
  },
  cache: Boolean,
  loading: Boolean,
  pagination: {
    type: Boolean,
    default: true
  },
  adaptive: Boolean,
  adaptiveConfig: Object,
}

export const tableEmits = ['register', 'columns-change']
