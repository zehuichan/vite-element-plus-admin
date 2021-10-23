import { loadEnv } from 'vite'
import { createVitePlugins } from './build'
import { wrapperEnv } from './build/utils'
import path from 'path'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const isBuild = command === 'build'

  return {
    define: {},
    resolve: {
      alias: {
        '@': resolve('src')
      },
      dedupe: ['vue'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  }
}
