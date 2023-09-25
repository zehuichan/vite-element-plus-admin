export default {
  key: {
    type: String || Number,
    default: '0'
  },
  columns: {
    type: Array,
    default: []
  },
  loading: Boolean,
  pagination: {
    type: Boolean,
    default: true
  },
}