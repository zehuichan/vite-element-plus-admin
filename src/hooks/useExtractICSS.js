// share-variables-between-js-and-sass
export function useExtractICSS(source) {
  const reg = /([\w]+):([^?&=;]*)/g
  const obj = {}
  source.replace(reg, (rs, $1, $2) => {
    const name = $1
    let val = $2
    val = val.trim()
    obj[name] = val
    return rs
  })
  return obj
}