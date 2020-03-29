import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
