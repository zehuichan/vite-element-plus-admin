import AppProvider from './AppProvider'
import Fullcontent from './Fullcontent'
import Icon from './Icon'
import SchemaForm, { ApiSelect } from './SchemaForm'
import SvgIcon from './SvgIcon'

const components = [
  AppProvider,
  Fullcontent,
  Icon,
  SchemaForm,
  ApiSelect,
  SvgIcon
]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}
