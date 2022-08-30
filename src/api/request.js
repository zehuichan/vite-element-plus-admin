import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'

// create an axios instance
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // api的base_url
  timeout: 50 * 1000 // request timeout
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(`err,${error}`)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(`status:${res.code}, ${res.msg}`)
      return Promise.reject(res.msg)
    } else {
      return response.data
    }
  },
  (error) => {
    console.log(`err,${error}`)
    ElMessage.error(`err,${error}`)
    return Promise.reject(error)
  }
)

export default http
