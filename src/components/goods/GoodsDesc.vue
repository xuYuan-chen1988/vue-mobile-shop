<template>
  <div class="desc_container">
    <h2>{{info.title}}</h2>
    <div v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 图文数据
      info: {}
    }
  },
  created () {
    this.getGoodsDesc()
  },
  mounted () {

  },
  methods: {
    async getGoodsDesc () {
      const { data: res } = await this.$http.get('api/goods/goodsdesc/' + this.$route.params.id)
      // console.log(res)
      if (res.meta.status !== 200) return this.$toast('获取图文详情失败')
      this.info = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.desc_container {
  width: 100vw;
  overflow: hidden;
  .content {
    width: 100%;
    .img-ks-lazyload {
      width: 100%;
    }
  }
}
h2 {
  font-size: 20px;
  color: #226aff;
  text-align: center;
}
.desc_container /deep/ .img-ks-lazyload {
  width: 100%;
}
</style>
