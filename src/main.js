
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from './components/Home'
import About from './components/About'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vSelect from 'vue-select'
import AddAppointmentDefault from 'add-appointment'
import VueSimpleAlert from 'vue-simple-alert'

Vue.use(VueSimpleAlert)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]
const router = new VueRouter({
  routes,
  axios,
  mode: 'history'
})

Vue.component('v-select', vSelect)
new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  router,
  components: {
    App,
    AddAppointmentDefault
  },
  template: '<App/>'
}).$mount('#app')
