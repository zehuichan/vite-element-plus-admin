export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const BLANK = () => import('@/layouts/blank.vue')

export const LAYOUT = () => import('@/layouts/index.vue')

export const ERROR_PAGE = () => import('@/views/error-page/index.vue')

export const getParentLayout = (_name) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME
      })
    })
}
