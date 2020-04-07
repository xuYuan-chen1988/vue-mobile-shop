<template>
  <div class="app-container">
    <!-- 顶部 header 区域 -->
    <van-nav-bar title="品优购" :left-text="gobackStr" fixed @click-left="goBack" />
    <!-- 中间 router-view区域 -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- TabBar 区域 -->
    <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/member">会员</van-tabbar-item>
      <van-tabbar-item
        icon="shopping-cart-o"
        :badge="this.$store.getters.getAllCount"
        to="/shopcar"
        id="shopCar"
      >购物车</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gobackStr: '<返回'
    }
  },
  created () {
    this.gobackStr = this.$route.path === '/home' ? '' : '<返回'
    // if (this.$route.path === '/home') {
    //   this.gobackStr = ''
    // } else {
    //   this.gobackStr = '<返回'
    // }
  },
  mounted () {

  },
  methods: {
    goBack () {
      // 点击后退按钮
      this.$router.back()
    }

  },
  components: {

  },
  watch: {
    '$route.path': function (newVal) {
      if (newVal === '/home') {
        this.gobackStr = ''
      } else {
        this.gobackStr = '<返回'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  margin-top: 40px;
  margin-bottom: 50px;
  position: relative;
  .van-tabbar {
    background-color: chartreuse;
    font-weight: 900;
    color: #000;
    border-radius: 3px;
  }
}
.van-nav-bar {
  background-color: chartreuse;
  width: 100%;
  height: 40px;
  line-height: 40px;
  z-index: 10;
  .van-nav-bar__title {
    font-weight: 900;
    color: #000;
  }
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
  top: -30px;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s linear;
}
</style>
