import { createApp } from 'vue'
import App from './App.vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
// global css
import './styles/index.scss'

import { setupElementPlus } from './plugins/element-plus'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupGuard } from './router/guard'
import { setupErrorLog } from './plugins/error-log'
import { registerComponents } from './components'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  setupElementPlus(app)
  registerComponents(app)
  setupRouter(app)
  setupGuard(router)
  setupErrorLog(app)
  app.mount('#app')
}

void bootstrap()
