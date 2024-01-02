import { genMessage } from '../helper'
import frameworkLocale from 'element-plus/es/locale/lang/en'

const modules = import.meta.glob('./en/**/*.js', { eager: true })
export default {
  message: {
    ...genMessage(modules, 'en'),
    frameworkLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
}
