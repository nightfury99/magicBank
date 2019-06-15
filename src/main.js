import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import * as VueGoogleMaps from 'vue2-google-maps'

import '@/icons' // icon
import '@/permission' // permission control

import { sync } from 'vuex-router-sync'
import VeeValidate from 'vee-validate'

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

Vue.use(ElementUI, { locale })
Vue.use(VeeValidate)
Vue.use(require('vue-moment'))

Vue.use(require('vue-moment'));
Vue.use(require('vue-pusher'), {
  api_key: 'cd5529914d6717c12260',
  options: {
    cluster: 'ap1',
    forceTLS: true,
  }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDEhQMCSKxKL3ANoif0BjjePyTA7ekXXE4',
    libraries: "places"
  }
})

sync(store, router)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
