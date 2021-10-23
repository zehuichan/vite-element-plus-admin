import defaultSettings from '@/settings'

const title = defaultSettings.title

export function useTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}