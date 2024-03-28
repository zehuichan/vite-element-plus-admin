export const tableProps = {
  name: String,
  columns: {
    type: Array,
    default: []
  },
  loading: Boolean,
  adaptive: Boolean,
  adaptiveConfig: Object,
}

export const tableEmits = ['register']
