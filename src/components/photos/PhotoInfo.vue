<template>
  <div class="photoinfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p>
      <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
      <span>点击: {{photoInfo.click}}次</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="(item, index) in imagelist" :key="index" @click="showimage(index)">
        <van-image :src="item" />
      </van-grid-item>
    </van-grid>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoInfo.content"></div>
    <hr />
    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue'
import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      id: this.$route.params.id, // 从路由获取到图片Id
      photoInfo: {}, // 图片详情
      imagelist: []
    }
  },
  created () {
    this.getPhotoInfo()
  },
  mounted () {

  },
  methods: {
    // 获取图片详情的方法
    getPhotoInfo () {
      this.$http.get('api/getimageInfo/' + this.id).then(result => {
        if (result.data.meta.status !== 200) return this.$toast('获取图片详情失败')
        // console.log(result.data)
        this.photoInfo = result.data.data[0]
        this.imagelist = result.data.data[0].imageurl
      })
    },
    showimage (index) {
      ImagePreview({
        images: this.imagelist,
        showIndex: true,
        // loop: false,
        startPosition: index
      })
    }
  },
  components: { // 注册评论子组件
    'cmt-box': comment
  }
}
</script>

<style lang="less" scoped>
.photoinfo-container {
  padding: 0 5px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    padding: 15px 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    line-height: 30px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
    font-weight: 700;
  }
  .van-grid-item {
    height: 130px;
    padding: 5px 5px 0 0;
  }
  .van-image {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 5px #999;
  }
}
</style>
