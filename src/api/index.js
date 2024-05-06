import request from '@/utils/request'

export function uploadApi(params, onUploadProgress) {
  const formData = new FormData()
  const customFilename = params.name || 'file'

  if (params.filename) {
    formData.append(customFilename, params.file, params.filename)
  } else {
    formData.append(customFilename, params.file)
  }

  return request({
    method: 'POST',
    data: formData,
    onUploadProgress: onUploadProgress
  })
}

export function fireErrorApi() {
  return request({
    url: '/error',
    method: 'get'
  })
}

export function dictApi() {
  return request({
    url: `/dict/select`,
    method: 'get',
  })
}
