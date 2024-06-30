export function resultSuccess(result, { message = 'ok' } = {}) {
  return {
    code: 200,
    data: result,
    message,
    type: 'success'
  }
}

export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    data: result,
    message,
    type: 'error'
  }
}
