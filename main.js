// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/bootstrap-vue'
import vuetify from './plugins/vuetify' // path to vuetify export
import App from './App'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import store from './store/store.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  components: { App },
  template: '<App/>'
})

