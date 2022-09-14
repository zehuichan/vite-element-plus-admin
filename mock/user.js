import Mock from 'mockjs'
import { resultSuccess } from './_util'

const { Random } = Mock

const token = Random.string('upper', 32, 32)
const avatar = Random.image('24x24')
const password = Random.string('upper', 4, 16)

const user = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: avatar,
  desc: 'manager',
  password: password,
  token,
  roles: [
    {
      roleName: 'Super Admin',
      value: 'super'
    }
  ]
}

export default [
  // user login
  {
    url: '/user/login',
    method: 'post',
    response: () => {
      return resultSuccess(user)
    }
  },

  // get user info
  {
    url: '/user/info',
    method: 'get',
    response: () => {
      return resultSuccess(user)
    }
  }
]
