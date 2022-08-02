import { createPinia } from 'pinia'

const store = createPinia()

export { useAppStore } from './modules/app'
export { useErrorLogStore } from './modules/errorLog'
export { usePermissionStore } from './modules/permission'
export { useUserStore } from './modules/user'
export { useTabsViewStore } from './modules/multipleTab'

export function setupStore(app) {
  app.use(store)
}

export { store }
