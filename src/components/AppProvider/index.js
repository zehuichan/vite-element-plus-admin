import { withInstall } from '@/utils/install'
import _AppProvider from './src/AppProvider.vue'

export { useAppProviderContext } from './src/useAppContext'

export const AppProvider = withInstall(_AppProvider)
export default AppProvider
