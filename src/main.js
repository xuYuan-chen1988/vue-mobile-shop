import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './assets/css/global.css'
// import Vant, { Lazyload } from 'vant'

// import 'vant/lib/index.css'
import axios from 'axios'
import moment from 'moment'
// 2.引入vuex
import Vuex from 'vuex'
// 3. 注册vuex
Vue.use(Vuex)
//  每人次进入网站 肯定会调用main.js 在刚调用的时候, 先从本地存储中把购物车的数据读出来, 存到store中
const car = JSON.parse(localStorage.getItem('car') || '[]')
// 4. new 一个 store,传一个配置对象
const store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car // 将购物车中的商品的数据用一个数组存储起来,在car数组中,存储一些商品的对象,咱们可以暂时将这个商品对象,设计成这个样子, { id: 商品的id, count :要购买的数量, price: 商品的单价, seected: 是否选中(true,false)}

  },
  mutations: { // this.$store.commit('方法名字','按需传递唯一的参数')
    addToCar (state, goodsinfo) {
      // 点击加入购物车,把商品信息,保存到 store 中的car 上
      // 分析
      // 1. 如果购车中,之前就已经有这个对应的商品了,那么只需要更新数量
      // 2. 如果没有则把商品添加到car数组的第一位
      // 假设 购车里面没有 对应的商品
      let flag = false
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true // 终止循环
        }
      })
      //  如果some 循环完毕没有找到对应的商品,则flag 还是false ,表示没有找到,此时把商品推到数组的第一位
      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 当更新car之后,把car 数组,存储到本地的 localStorage 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo (state, goodsinfo) {
      // 修改购物车中商品的数量值
      // 分析:
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量把最新的数量保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar (state, id) {
      // 根据id 从store中的购物车中 删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后的最后的购物车数据,同步到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsChecked (state, goodsinfo) {
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.checked = goodsinfo.checked
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    // 相当于计算属性,也相当于过滤器
    getAllCount (state) {
      let c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    }
  }
})
// 设置http请求的根路径, 实际请求的时候根路径可以省略了,开发阶段mock数据的时候可以填 mock数据的地址,联调阶段修改此项就可以了,不用到每一个组件里面修改,很方便
axios.defaults.baseURL = 'https://www.fastmock.site/mock/3be3711af23d9c866f843cc57a53d4cc/mobile'
// 全局设置 post 时候表单数据格式的组织形式,为 json 格式  默认是:'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

Vue.prototype.$http = axios
// Vue.use(Vant)
// Vue.use(Lazyload, {
//   lazyComponent: true
// })
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
  store, // 5.挂载 store状态管理对象
  render: h => h(App)
}).$mount('#app')
