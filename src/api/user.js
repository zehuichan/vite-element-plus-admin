import request from '@/utils/request'
import { resultSuccess } from './_util'

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
  return new Promise((resolve, reject) => {
    resolve(resultSuccess(USER_DATA))
  })
}

export function getInfo() {
  return new Promise((resolve, reject) => {
    resolve(resultSuccess(USER_DATA))
  })
}
