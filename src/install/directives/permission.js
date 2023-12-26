import { usePermission } from '@/hooks/web/usePermission'

const authDirective = {
  mounted(el, binding) {
    const { hasPermission } = usePermission()
    const value = binding.value

    if (!value) return
    if (!hasPermission(value)) {
      el.parentNode?.removeChild(el)
    }
  }
}


export function setupPermissionDirective(app) {
  app.directive('auth', authDirective)
}

export default authDirective
