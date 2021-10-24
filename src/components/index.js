import VFooter from './VFooter'
import VForm from './VForm'
import VSearch from './VSearch'
import VSvgIcon from './VSvgIcon'

const components = [
  VFooter,
  VForm,
  VSearch,
  VSvgIcon
]

const install = (app, opts = {}) => {
  components.forEach(component => app.component(component.name, component))
}

export function setupGlobComponents(app) {
  app.use(install)
}
