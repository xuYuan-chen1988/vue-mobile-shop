<template>
  <!-- 这是评论子组件 ，可以复用 -->
  <div>
    <h3>发表评论</h3>
    <form action>
      <textarea maxlength="120" placeholder="请输入要BB的内容(最多吐槽120字)"></textarea>
      <van-button type="info" size="large">发表评论</van-button>
      <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in comments" :key="i">
          <div
            class="cmt-title"
          >第{{ i + 1 }}楼&nbsp;&nbsp;:用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}</div>
          <div class="cmt-content">{{item.content ==='undefined' ? '此用户很懒，什么都没说': item.content }}</div>
        </div>
      </div>
      <van-button type="danger" size="large" @click="getmore">加载更多</van-button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [] // 所有评论数据
    }
  },
  created () {
    this.getComments()
  },
  mounted () {

  },
  methods: {
    // promise 的写法
    // getComments () { // + this.id + '?pageindex=' + this.pageIndex
    //   this.$http.get('api/getcomments').then(result => {
    //     const res = result.data
    //     if (res.body.status === 0) {
    //       console.log(result)
    //       console.log(res.body.message)
    //       // this.comments = result.body.message
    //     } else {
    //       this.$toast('获取评论失败！')
    //     }
    //   })
    // }
    // 获取评论
    async getComments () { // + this.id + '?pageindex=' + this.pageIndex
      const { data: res } = await this.$http.get('api/getcomments/' + this.id)
      if (res.status !== 200) return this.$toast('获取评论失败')
      // 每当获取新评论数据的时候,不要把老数据清空覆盖,而是应该以老数据拼接上新数据
      this.comments = this.comments.concat(res.message)
    },
    getmore () {
      this.pageIndex++
      this.getComments()
    }

  },
  props: ['id']
}
</script>

<style lang="less" scoped>
textarea {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  font-size: 14px;
}
h3 {
  font-size: 18px;
}
.cmt-list {
  margin: 5px 0;
  .cmt-item {
    font-size: 13px;
    .cmt-title {
      background-color: #ccc;
      line-height: 30px;
    }
    .cmt-content {
      line-height: 35px;
    }
  }
}
</style>
