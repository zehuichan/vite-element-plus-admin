import { withInstall } from '@/utils/install'
import _AppProvider, { APP_PROVIDER_KEY } from './src/AppProvider.vue'

export { APP_PROVIDER_KEY }
export const AppProvider = withInstall(_AppProvider)
export default AppProvider
