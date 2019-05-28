import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
