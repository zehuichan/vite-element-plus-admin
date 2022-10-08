export const ResultKeyEnum = {
  CODE: 'code',
  MESSAGE: 'message',
  RESULT: 'result'
}

export const ResultEnum = {
  SUCCESS: 200,
  ERROR: -1,
  TIMEOUT: 401,
  TYPE: 'success'
}

export const RequestEnum = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const ContentTypeEnum = {
  // json
  JSON: 'application/json;charset=UTF-8',
  // json
  TEXT: 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA: 'multipart/form-data;charset=UTF-8'
}
