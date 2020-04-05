<template>
  <div>
    <van-tabs animated @click="getPhotoByCateId">
      <van-tab v-for="item in categorages" :title="item.title" :key="item.id"></van-tab>
    </van-tabs>
    <ul class="photo-list">
      <router-link v-for="(img,i) in imageList" :key="i" :to="`photoinfo/`+ i" tag="li">
        <van-image :key="i" v-lazy="img.img_url" :src="img.img_url" fit="fill" :lazy-load="true" />
        <div class="info">
          <h2 class="info-title">{{img.title}}</h2>
          <p class="info-body">{{img.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 图片分类的数组
      categorages: [],
      // 图片列表的数组
      imageList: []
    }
  },
  created () {
    this.getAllCategory()
    // 进入页面就主动请求所有图片的列表
    this.getPhotoByCateId(0)
  },
  mounted () {

  },
  methods: {
    // 获取图片分类
    async getAllCategory () {
      const { data: res } = await this.$http.get('api/getimgcategory')
      if (res.meta.status !== 200) return this.$toast('获取图片分类失败')
      // 手动拼接出一个完整的分类,并添加到 分类的头部
      res.data.unshift({ title: '全部', id: 0 })
      this.categorages = res.data
    },
    async getPhotoByCateId (cateId, title) {
      const { data: res } = await this.$http.get('api/getimages/' + cateId)
      if (res.meta.status !== 200) return this.$toast('获取图片失败')
      // // console.log(res)
      // console.log(title)
      this.imageList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.photo-list {
  padding: 0 10px;
  li {
    background-color: #ccc;
    margin-bottom: 10px;
    vertical-align: middle;
    box-shadow: 0 0 6px #999;
    position: relative;
    .info {
      position: absolute;
      text-align: left;
      bottom: 0;
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      overflow: hidden;
      .info-title {
        margin: 0;
        padding: 0;
        height: 20px;
        padding-bottom: 10px;
        font-size: 14px;
      }
      .info-body {
        margin: 0;
        padding: 0;
        font-size: 13px;
      }
    }
  }
}
</style>
