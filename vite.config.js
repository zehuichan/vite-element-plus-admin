import path from 'path'
import pkg from './package.json'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/plugin'
import { createProxy } from './build/proxy'

const { name, version } = pkg

const __APP_INFO__ = {
  name,
  version,
  lastBuildTime: dayjs().format()
}

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root: root,
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    optimizeDeps: {
      include: ['@vue/runtime-core', '@vue/shared']
    }
  }
}
