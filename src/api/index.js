import request from '@/api/request'

export function optionsListApi(params) {
  return request({
    url: '/select/getDemoOptions',
    method: 'get',
    params
  })
}
