import router from './router'
// progress bar
import NProgress from 'nprogress'
// progress bar style
import 'nprogress/nprogress.css'
// NProgress Configuration
NProgress.configure({ showSpinner: false })
// hooks
import useTitle from '@/hooks/use-title'

router.beforeEach(async (to, from) => {
  // start progress bar
  NProgress.start()

  // set page title
  useTitle(to.meta.title)
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})