import http from '@/utils/http'

const USER_DATA = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: '',
  desc: 'manager',
  password: '123456',
  token: 'fakeToken1',
  homePath: '/dashboard/analysis',
  roles: [
    {
      roleName: 'Super Admin',
      value: 'super',
    },
  ],
}

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
  })
}
