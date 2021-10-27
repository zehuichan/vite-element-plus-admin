import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import { configElementPlusPlugin } from './element'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'

export function createVitePlugins(viteEnv, isBuild) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const vitePlugins = [
    // have to
    vue(),
    // have to
    vueJsx()
  ]

  // element-plus
  // vitePlugins.push(configElementPlusPlugin())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    )
  }

  return vitePlugins
}