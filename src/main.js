import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './assets/css/global.css'
import Vant, { Lazyload } from 'vant'

import 'vant/lib/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://www.fastmock.site/mock/3be3711af23d9c866f843cc57a53d4cc/mobile'
Vue.prototype.$http = axios
Vue.use(Vant)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.config.productionTip = false

// 定义全局时间过滤器，可以在全局使用
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
