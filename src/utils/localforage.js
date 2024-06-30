import localforage from 'localforage'

class Storage {

  constructor() {
    this.storageInstance = localforage.createInstance({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
    })
  }

  async setItem(k, v, m = 0) {
    try {
      const value = await this.storageInstance.setItem(k, {
        data: v,
        expires: m ? new Date().getTime() + m * 60 * 1000 : 0
      })
      return value.data
    } catch (err) {
      console.error('setItem', err)
    }
  }

  async getItem(k) {
    try {
      const value = await this.storageInstance.getItem(k)
      if (value && (value.expires > new Date().getTime() || value.expires === 0)) {
        return value.data
      } else {
        return null
      }
    } catch (err) {
      console.error('getItem', err)
    }
  }

  removeItem(k) {
    return this.storageInstance.removeItem(k).catch(console.error)
  }

  clear() {
    return this.storageInstance.clear().catch(console.error)
  }

  keys() {
    return this.storageInstance.keys().catch(console.error)
  }

  length() {
    return this.storageInstance.length().catch(console.error)
  }
}

export const localForage = new Storage()
