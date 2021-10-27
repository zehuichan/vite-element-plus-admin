import path from 'path'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/plugin'
import { createProxy } from './build/proxy'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    define: {},
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': resolve('src')
      },
      dedupe: ['vue'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    optimizeDeps: {
      include: [],
      exclude: [
        'vue-demi'
      ]
    },
  }
}
