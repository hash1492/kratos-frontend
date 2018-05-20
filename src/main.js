import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Toasted, {
  duration: 5000,
  type: 'success'
})
Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
