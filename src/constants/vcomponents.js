// components
import VSearch from '@/components/VSearch'

const components = [
  VSearch
]

function plugin(app) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default plugin