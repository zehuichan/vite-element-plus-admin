import 'element-plus/theme-chalk/display.css'
import './theme.scss'
import './element-plus.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function setupElementPlus(app) {
  // 全局引入图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
