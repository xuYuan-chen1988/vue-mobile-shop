<template>
  <div class="app-container">
    <!-- 顶部 header 区域 -->
    <van-nav-bar title="品优购" left-text="返回" left-arrow fixed @click-left="goBack" />
    <!-- 中间 router-view区域 -->
    <router-view></router-view>

    <!-- TabBar 区域 -->
    <van-tabbar>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">消息</van-tabbar-item>
      <van-tabbar-item icon="freinds-o">通讯录</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    goBack () {

    }

  },
  components: {
    // XHeader
  }
}
</script>

<style lang="less" scoped>
.app-container {
  margin-top: 40px;
  .el-tabs {
    bottom: 0;
    position: absolute;
  }
}
.van-nav-bar {
  background-color: lightblue;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
</style>
