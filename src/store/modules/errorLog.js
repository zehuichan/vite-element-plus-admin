import { defineStore } from 'pinia'

export const useErrorLogStore = defineStore({
  id: 'errorLog',
  state: () => ({
    logs: []
  }),
  actions: {
    addErrorLog(log) {
      this.logs.push(log)
    },
    clearErrorLog() {
      this.logs.splice(0)
    }
  }
})