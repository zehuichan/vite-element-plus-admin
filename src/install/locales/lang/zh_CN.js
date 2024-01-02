import { genMessage } from '../helper'
import frameworkLocale from 'element-plus/es/locale/lang/zh-cn'

const modules = import.meta.glob('./zh-CN/**/*.js', { eager: true })
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    frameworkLocale,
  },
}
