import { ref, unref } from 'vue'
import variables from '@/assets/scss/variables.scss'

// share-variables-between-js-and-sass
export default function useExtractICSS() {
  const obj = ref({})
  const reg = /([\w]+):([^?&=;]*)/g
  variables.replace(reg, (rs, $1, $2) => {
    const name = $1
    let val = $2
    val = val.trim()
    obj.value[name] = val
    return rs
  })

  return unref(obj)
}