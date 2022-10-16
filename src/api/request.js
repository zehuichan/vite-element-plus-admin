import axios from 'axios'
import { Cache, TOKEN_KEY } from '@/utils/cache'
import { useErrorLogStoreWithOut } from '@/store/modules/errorLog'

// create an axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // api的base_url
  timeout: 50 * 1000 // request timeout
})

http.interceptors.request.use((config) => {
  const token = Cache.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, null)

http.interceptors.response.use((response) => response.data, null)

export default (config) =>
  new Promise((resolve, reject) => {
    http
      .request(config)
      .then((res) => {
        console.log(res)
        resolve(resolve)
      })
      .catch((err) => {
        const errorLogStore = useErrorLogStoreWithOut()
        errorLogStore.addAjaxErrorInfo(err)
        console.log(err)
        reject(err)
      })
  })
