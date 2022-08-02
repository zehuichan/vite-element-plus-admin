// token key
export const TOKEN_KEY = 'TOKEN__'
// user info key
export const USER_INFO_KEY = 'USER__INFO__'
// role info key
export const ROLES_KEY = 'ROLES__KEY__'
// project config key
export const PROJ_CFG_KEY = 'PROJ__CFG__KEY__'

// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

class Cache {
  setItem(key, value, expire = DEFAULT_CACHE_TIME) {
    const stringData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null
    })
    localStorage.setItem(key, stringData)
  }

  getItem(key, def = null) {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        const data = JSON.parse(item)
        const { value, expire } = data
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value
        }
        this.removeItem(key)
      } catch (e) {
        return def
      }
    }
    return def
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export default new Cache()
