import AppProvider from './AppProvider'
import Form from './Form'
import Icon from './Icon'
import SvgIcon from './SvgIcon'

const components = [AppProvider, Form, Icon, SvgIcon]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}
