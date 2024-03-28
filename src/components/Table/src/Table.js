export const tableProps = {
  name: String,
  columns: {
    type: Array,
    default: []
  },
  loading: Boolean,
  pagination: {
    type: Boolean,
    default: true
  },
  adaptive: Boolean,
  adaptiveConfig: Object,
}

export const tableEmits = ['register']
