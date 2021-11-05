import { ref, watchEffect } from 'vue'

// share-variables-between-js-and-sass
export default function useExtractICSS(source) {
  const obj = ref({})
  const reg = /([\w]+):([^?&=;]*)/g
  source.replace(reg, (rs, $1, $2) => {
    const name = $1
    let val = $2
    val = val.trim()
    obj.value[name] = val
    return rs
  })

  return obj
}