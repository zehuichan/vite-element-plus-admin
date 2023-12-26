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
import { setupErrorHandle } from './install/plugins/error-handle'
import { setupGlobDirectives } from './install/directives'
import { setupI18n } from './install/locales/setupI18n'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupGuard } from './router/guard'
import { registerComponents } from './components'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupGlobDirectives(app)
  await setupI18n(app)
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
