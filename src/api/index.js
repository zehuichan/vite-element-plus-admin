import http from '@/utils/http'

export function uploadApi(params, onUploadProgress) {
  return http.uploadFile({
    params,
    onUploadProgress
  })
}

export function fireErrorApi() {
  return http.request({
    url: '/error',
    method: 'get'
  })
}

export function dictApi(groupCode) {
  return http.request({
    url: `/dict/${groupCode}`,
    method: 'get'
  })
}
