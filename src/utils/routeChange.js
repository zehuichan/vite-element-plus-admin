/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */

import mitt from 'mitt'
import { getRawRoute } from '@/utils'

const emitter = mitt()

const key = Symbol()

let lastChangeTab

export function setRouteChange(lastChangeRoute) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

export function listenerRouteChange(callback, immediate = true) {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function removeTabChangeListener() {
  emitter.all.clear()
}
