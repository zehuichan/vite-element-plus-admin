import defaultSettings from '@/settings'

const title = defaultSettings.title

export default function useTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}