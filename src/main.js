import { createApp } from 'vue'
import App from './App.vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// global css
import './assets/scss/index.scss'

import { setupElementPlus } from './plugins/element'
import { setupGlobComponents } from './components'

import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard'

function bootstrap() {
  const app = createApp(App)

  setupElementPlus(app)
  setupGlobComponents(app)
  setupStore(app)
  setupRouter(app)
  setupRouterGuard(router)
  app.mount('#app')
}

bootstrap()
