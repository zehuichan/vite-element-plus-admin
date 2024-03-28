import forage from 'localforage'

class StorageProxy {
  constructor(storageModel) {
    this.storage = storageModel
    this.storage.config({
      driver: [this.storage.INDEXEDDB, this.storage.LOCALSTORAGE],
    })
  }

  async setItem(k, v, m = 0) {
    try {
      const value = await this.storage.setItem(k, {
        data: v,
        expires: m ? new Date().getTime() + m * 60 * 1000 : 0
      })
      return value.data
    } catch (err) {
      console.error(err)
    }
  }

  async getItem(k) {
    try {
      const value = await this.storage.getItem(k)
      if (value && (value.expires > new Date().getTime() || value.expires === 0)) {
        return value.data
      } else {
        return null
      }
    } catch (err) {
      console.error(err)
    }
  }

  removeItem(k) {
    return this.storage.removeItem(k).catch(console.error)
  }

  clear() {
    return this.storage.clear().catch(console.error)
  }

  keys() {
    return this.storage.keys().catch(console.error)
  }
}

export const localForage = () => new StorageProxy(forage)
