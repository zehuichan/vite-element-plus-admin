// Register icon sprite
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// global css
import './assets/styles/index.scss'

import { setupElementPlus } from './install/plugins/element-plus'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupGuard } from './router/guard'
import { setupErrorHandle } from './install/plugins/error-handle'
import { registerComponents } from './components'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupElementPlus(app)
  registerComponents(app)
  setupRouter(app)
  setupGuard(router)
  setupErrorHandle(app)
  app.mount('#app')
}

void bootstrap()

// eslint-disable-next-line no-undef
console.table(__APP_INFO__)
