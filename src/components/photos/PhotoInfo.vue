<template>
  <div>
    <h3>标题</h3>
    <p>
      <span>发表时间</span>
      <span>点击: 0次</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->
    <!-- 图片内容区域 -->
    <div class="content"></div>
    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  components: { // 注册子组件
    'cmt-box': comment
  }
}
</script>

<style lang="less" scoped>
</style>
