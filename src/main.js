// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import {createApp} from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'

import VComponents from '@/constants/vcomponents' // global components

import '@/styles/scss/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './permission'

const { mockXHR } = require('../mock')
mockXHR()

const app = createApp(App)

console.info('Vue', `v${app.version}`)
console.info('ElementPlus', `v${ElementPlus.version}`)

app.use(ElementPlus, { size: 'small', locale })
app.use(VComponents)
app.use(store)
app.use(router)
app.mount('#app')
