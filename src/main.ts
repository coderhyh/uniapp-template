// eslint-disable-next-line import/no-unresolved
import 'uno.css'

import { createSSRApp } from 'vue'

import interceptor from '~/interceptor'

import App from './App.vue'
import pinia from './store'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia).use(interceptor)
  return {
    app
  }
}
