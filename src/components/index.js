const components = []

const install = (app, opts = {}) => {
  components.forEach(component => app.component(component.name, component))
}

export function setupGlobComponents(app) {
  app.use(install)
}
