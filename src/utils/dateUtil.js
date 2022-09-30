/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(date = undefined, format = DATE_TIME_FORMAT) {
  return dayjs(date).format(format)
}

export function formatToDate(date = undefined, format = DATE_FORMAT) {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs
