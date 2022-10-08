import http from '@/utils/http'

export function menu() {
  return http.request({
    url: '/sys/menu',
    method: 'get'
  })
}
