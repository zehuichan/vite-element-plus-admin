import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export function setupElementPlus(app) {
  app.use(ElementPlus, { size: 'small', zIndex: 2000 })
}