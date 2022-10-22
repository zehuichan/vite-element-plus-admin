import { resultSuccess } from './_util'

const demoList = (keyword, count = 20) => {
  const result = {
    list: []
  }
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `${keyword ?? ''}选项${index}`,
      id: `${index}`
    })
  }
  return result
}

export default [
  {
    url: '/dict/:groupCode',
    timeout: 1000,
    method: 'get',
    response: ({ url }) => {
      const keyword = url.replace(/\/dict\//, '')
      return resultSuccess(demoList(keyword))
    }
  }
]
