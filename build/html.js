import html from 'vite-plugin-html'
import defaultSettings from '../src/settings.js'

export function configHtmlPlugin(env, isBuild) {
  return html({
    minify: isBuild,
    inject: {
      data: defaultSettings
    },
  })
}