// Register icon sprite
import 'virtual:svg-icons-register'
// unocss
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'

import { createApp } from 'vue'
import App from './App.vue'

// global css
import './assets/styles/index.scss'

import { setupElementPlus } from './install/framework/element-plus'
import { setupIconPark } from './install/icons/icon-park'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupGuard } from './router/guard'
import { setupErrorHandle } from './install/plugins/error-handle'
import { registerComponents } from './components'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupElementPlus(app)
  setupIconPark(app)
  registerComponents(app)
  setupRouter(app)
  setupGuard(router)
  setupErrorHandle(app)
  app.mount('#app')
}

bootstrap()

// eslint-disable-next-line no-undef
console.table(__APP_INFO__)
