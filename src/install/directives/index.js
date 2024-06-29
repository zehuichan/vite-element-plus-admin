import { setupFocusNextDirective } from './focus-next'
import { setupMagicFocusDirective } from './magic-focus'
import { setupPermissionDirective } from './permission'

export function setupGlobDirectives(app) {
  setupFocusNextDirective(app)
  setupMagicFocusDirective(app)
  setupPermissionDirective(app)
}
