/**
 * Multi-language related operations
 */

import { i18n } from './setupI18n'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { unref, computed } from 'vue'
import { loadLocalePool, setHtmlPageLang } from './helper'

function setI18nLanguage(locale) {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)
  const getShowLocalePicker = computed(() => localeStore.getShowPicker)

  const getFrameworkLocale = computed(() => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.frameworkLocale ?? {}
  })

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    const langModule = (await import(`./lang/${locale}.js`)).default
    if (!langModule) return

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getFrameworkLocale,
  }
}
