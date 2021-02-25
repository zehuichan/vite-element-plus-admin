// components
import VSearch from '@/components/VSearch'
import VForm from '@/components/VForm'
import VFooter from '@/components/VFooter'
import VSvgIcon from '@/components/VSvgIcon'

const components = [
  VSearch,
  VForm,
  VFooter,
  VSvgIcon
]

function plugin(app) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default plugin