import { vitePluginFakeServer } from 'vite-plugin-fake-server'

export function configMockPlugin(isBuild) {
  return vitePluginFakeServer({
    include: 'mock',
    infixName: false,
    enableDev: !isBuild,
    enableProd: isBuild,
  })
}
