import { resolve } from 'path'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/plugin'
import { createProxy } from './build/proxy'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY } = viteEnv

  const isBuild = command === 'build'

  return {
    define: {},
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': pathResolve('src') + '/'
      },
      dedupe: ['vue'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
  }
}
