export const tableProps = {
  tableKey: {
    type: [String, Number],
    default: '0'
  },
  rowKey: {
    type: [Function, String],
    default: 'id'
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
  keyboard: Boolean,
  selected: Boolean,
  adaptive: Boolean,
  adaptiveConfig: Object,
}

export const tableEmits = ['register', 'columns-change']
