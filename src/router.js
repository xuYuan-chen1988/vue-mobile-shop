import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入对应的组件
import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import Shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/member', component: Member },
    { path: '/shopcar', component: Shopcar },
    { path: '/search', component: search }
  ]
  // linkActiveClass: 'active123'
})

export default router
