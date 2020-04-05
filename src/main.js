import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './assets/css/global.css'
import Vant, { Lazyload } from 'vant'

import 'vant/lib/index.css'
import axios from 'axios'
import moment from 'moment'

// 设置http请求的根路径, 实际请求的时候根路径可以省略了,开发阶段mock数据的时候可以填 mock数据的地址,联调阶段修改此项就可以了,不用到每一个组件里面修改,很方便
axios.defaults.baseURL = 'https://www.fastmock.site/mock/3be3711af23d9c866f843cc57a53d4cc/mobile'
// 全局设置 post 时候表单数据格式的组织形式,为 json 格式  默认是:'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

Vue.prototype.$http = axios
Vue.use(Vant)
Vue.use(Lazyload, {
  lazyComponent: true
})
Vue.config.productionTip = false

// 定义全局时间过滤器，可以在全局使用
// 用 menent.js 的一个包来创建一个全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH-MM-SS') {
  return moment(dataStr).format(pattern)
})
// 自定义的过滤器 在iphone7s plus 上 测试时间不正常,故使用moment.js的包
// Vue.filter('dateFormat', function (originVal) {
//   const dt = new Date(originVal)
//   const y = dt.getFullYear()
//   const m = (dt.getMonth() + 1 + '').padStart(2, '0')
//   const d = (dt.getDate() + '').padStart(2, '0')

//   const hh = (dt.getHours() + '').padStart(2, '0')
//   const mm = (dt.getMinutes() + '').padStart(2, '0')
//   const ss = (dt.getSeconds() + '').padStart(2, '0')
//   return `${y}年${m}月${d}日 ${hh}时${mm}分${ss}秒`
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
