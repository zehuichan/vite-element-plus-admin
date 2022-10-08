import http from '@/utils/http'

export function login(data) {
  return http.request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return http.request({
    url: '/user/info',
    method: 'get',
    headers: {
      ignoreCancelToken: true
    }
  })
}
