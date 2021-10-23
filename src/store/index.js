import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = import.meta.globEager('./modules/**/*.js')

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/(\.\/modules\/|\.js)/g, '')
  const value = modulesFiles[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})

export const store = createStore({
  modules,
  getters
})

export function setupStore(app) {
  app.use(store)
}