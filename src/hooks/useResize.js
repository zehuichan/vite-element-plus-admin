import { ref, onBeforeMount, onBeforeUnmount } from 'vue'

const inBrowser = typeof window !== 'undefined'

export default function useResize() {
  const width = ref(inBrowser ? window.innerWidth : 0)
  const height = ref(inBrowser ? window.innerHeight : 0)

  const onResize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onBeforeMount(() => {
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    window.removeEventListener('orientationchange', onResize)
  })

  return { width, height }
}
