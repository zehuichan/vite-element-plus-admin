import { useErrorLogStoreWithOut } from '@/store/modules/errorLog'
import projectSetting from '@/settings/projectSetting'

/**
 * Handling error stack information
 * @param error
 */
function processStackMsg(error) {
  if (!error.stack) {
    return ''
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, '') // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString()
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack
  }
  return stack
}

/**
 * get comp name
 * @param vm
 */
function formatComponentName(vm) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root'
    }
  }

  const options = vm.$options
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous'
    }
  }
  const name = options.name || options._componentTag
  return {
    name: name,
    path: options.__file
  }
}

/**
 * Configure Vue error handling function
 */
function vueErrorHandler(err, vm, info) {
  const errorLogStore = useErrorLogStoreWithOut()
  const { name, path } = formatComponentName(vm)
  errorLogStore.addErrorLogInfo({
    type: 'vue',
    name,
    file: path,
    message: err.message,
    stack: processStackMsg(err),
    detail: info,
    url: window.location.href
  })
}

/**
 * Configure script error handling function
 */
export function scriptErrorHandler(event, source, lineno, colno, error) {
  if (event === 'Script error.' && !source) {
    return false
  }
  const errorInfo = {}
  colno = colno || (window.event && window.event.errorCharacter) || 0
  errorInfo.message = event
  if (error?.stack) {
    errorInfo.stack = error.stack
  } else {
    errorInfo.stack = ''
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script'
  const errorLogStore = useErrorLogStoreWithOut()
  errorLogStore.addErrorLogInfo({
    type: 'script',
    name: name,
    file: source,
    detail: 'lineno' + lineno,
    url: window.location.href,
    ...errorInfo
  })
  return true
}

/**
 * Configure Promise error handling function
 */
function registerPromiseErrorHandler() {
  window.addEventListener(
    'unhandledrejection',
    function (event) {
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: 'promise',
        name: 'Promise Error!',
        file: 'none',
        detail: 'promise error!',
        url: window.location.href,
        stack: 'promise error!',
        message: event.reason
      })
    },
    true
  )
}

/**
 * Configure monitoring resource loading error handling function
 */
function registerResourceErrorHandler() {
  // Monitoring resource loading error(img,script,css,and jsonp)
  window.addEventListener(
    'error',
    (e) => {
      const target = e.target ? e.target : e.srcElement
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: 'resource',
        name: 'Resource Error!',
        file: (e.target || {}).currentSrc,
        detail: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: e.type
        }),
        url: window.location.href,
        stack: 'resource is not found',
        message: (e.target || {}).localName + ' is load error'
      })
    },
    true
  )
}

export function setupErrorHandle(app) {
  const { useErrorHandle } = projectSetting
  if (!useErrorHandle) {
    return
  }
  // Vue exception monitoring;
  app.config.errorHandler = vueErrorHandler

  // script error
  window.onerror = scriptErrorHandler

  //  promise exception
  registerPromiseErrorHandler()

  // Static resource exception
  registerResourceErrorHandler()
}
