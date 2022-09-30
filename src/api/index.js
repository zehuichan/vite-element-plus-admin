import request from '@/api/request'

export function uploadFile(config, params) {
  const formData = new window.FormData()
  const customFilename = params.name || 'file'

  if (params.filename) {
    formData.append(customFilename, params.file, params.filename)
  } else {
    formData.append(customFilename, params.file)
  }

  if (params.data) {
    Object.keys(params.data).forEach((key) => {
      const value = params.data[key]
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item)
        })
        return
      }

      formData.append(key, params.data[key])
    })
  }

  return request({
    ...config,
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data;charset=UTF-8'
    }
  })
}

export function uploadApi(params, onUploadProgress) {
  return uploadFile({
    params,
    onUploadProgress
  })
}

export function optionsListApi(params) {
  return request({
    url: '/select/getDemoOptions',
    method: 'get',
    params
  })
}

export function fireErrorApi() {
  return request({
    url: '/error',
    method: 'get'
  })
}
