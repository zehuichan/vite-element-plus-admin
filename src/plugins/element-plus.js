// todo https://github.com/antfu/unplugin-vue-components/issues/162
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function setupElementPlus(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
