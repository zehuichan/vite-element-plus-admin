const prefix = import.meta.env.VITE_WECHAT_APPID

class Cache {
  setItem(key, value) {
    try {
      localStorage.setItem(prefix + key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(prefix + key))
    } catch (e) {
      return ''
    }
  }

  removeItem(key) {
    return localStorage.removeItem(prefix + key)
  }

  setSession(key, value) {
    try {
      sessionStorage.setItem(prefix + key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  getSession(key) {
    try {
      return JSON.parse(sessionStorage.getItem(prefix + key))
    } catch (e) {
      return ''
    }
  }

  removeSession(key) {
    return sessionStorage.removeItem(prefix + key)
  }
}

export default new Cache()
