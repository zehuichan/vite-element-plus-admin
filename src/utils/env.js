export function getEnv() {
  return import.meta.env.MODE
}

export function isDevMode() {
  return import.meta.env.DEV
}

export function isProdMode() {
  return import.meta.env.PROD
}
