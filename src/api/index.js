import http from '@/utils/http'

export function uploadApi(params, onUploadProgress) {
  return http.uploadFile({
    params,
    onUploadProgress
  })
}

export function optionsListApi(params) {
  return http.request({
    url: '/select/getDemoOptions',
    method: 'get',
    params
  })
}

export function fireErrorApi() {
  return http.request({
    url: '/error',
    method: 'get'
  })
}
