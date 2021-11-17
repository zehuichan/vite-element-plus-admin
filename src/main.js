import { createApp } from 'vue'
import App from './App.vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// global css
import './assets/scss/index.scss'

import { setupGlobComponents } from './components'

import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard'

async function bootstrap() {
  const app = createApp(App)

  setupGlobComponents(app)
  setupStore(app)
  setupRouter(app)
  setupRouterGuard(router)
  app.mount('#app')
}

void bootstrap()
