<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3>新闻标题id:{{newsinfo.id}}--{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p>
      <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
      <span>点击： {{newsinfo.click}}次</span>
    </p>
    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
  data () {
    return {
      id: this.$route.params.id, // 将url地址中传递过来的 id值 挂载到data上 方便以后调用
      newsinfo: {}
    }
  },
  created () {
    this.getNewsInfo()
  },
  mounted () {

  },
  methods: {
    async getNewsInfo () {
      const { data: res } = await this.$http.get('api/getnewsinfo/' + this.id)
      if (res.meta.status !== 200) return this.$toast('获取新闻详情失败')
      this.newsinfo = res.data
    }
  },
  components: {
    'comment-box': comment
  }
}
</script>

<style lang="less" scoped>
.newsinfo-container {
  padding: 0 4px;
  h3 {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  p {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #226aff;
  }
  .content {
    font-size: 13px;
  }
  //  /deep/ 和 >>> 功能是一样的，适用于不同的 css预渲染器
  .content /deep/ img {
    border: 1px solid #aaa;
    width: 100%;
  }
}
</style>
