export const paginationProps = {
  layout: {
    type: String,
    default: 'prev, pager, next, jumper, ->, total'
  },
  autoScroll: Boolean
}

export const paginationEmits = ['pagination']
