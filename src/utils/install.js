export function withInstall(options) {
  options.install = (app) => {
    const { name } = options
    app.component(name, options)
  }
  return options
}
