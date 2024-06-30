/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(date = undefined, format = DATE_TIME_FORMAT) {
  if (date) return dayjs(date).format(format)
  return ''
}

export function formatToDate(date = undefined, format = DATE_FORMAT) {
  if (date) return dayjs(date).format(format)
  return ''
}

export const dateUtil = dayjs
