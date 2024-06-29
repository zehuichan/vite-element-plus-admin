export const tableProps = {
  name: {
    type: String,
    default: ''
  },
  columns: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  pagination: {
    type: Boolean,
    default: true
  },
  adaptive: Boolean,
  adaptiveConfig: Object,
}

export const tableEmits = ['register', 'columns-change']
