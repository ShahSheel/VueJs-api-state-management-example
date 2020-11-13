import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Base.vue'
import Units from '../components/Units/Base.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/units', name: 'Units',  component: Units },
  ]
})


