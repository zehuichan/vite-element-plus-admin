import defaultSettings from '@/settings'

const title = defaultSettings.title

const useTitle = (pageTitle) => {
  if (pageTitle) {
    document.title = `${pageTitle} - ${title}`
  } else {
    document.title = title
  }
}

export default useTitle