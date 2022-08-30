import { withInstall } from '@/utils'
import _Form from './src/Form.vue'

export { useForm } from './src/hooks/useForm'

export const Form = withInstall(_Form)
export default Form
