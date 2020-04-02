<template>
  <div>
    <!-- 图片列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <router-link
        class="card"
        v-for="item in  newsList"
        :key="item.id"
        :to="'/home/newsinfo/' + item.id"
        tag="li"
      >
        <img :src="item.imageurl" />
        <h3>{{ item.title}}</h3>
        <p>
          <span>发表时间：{{ item.add_time | dateFormat }}</span>
          <span>点击: {{item.click}}次</span>
        </p>
      </router-link>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      finished: true,
      newsList: [] // 新闻列表的数据
    }
  },
  created () {
    this.getNewsList()
  },
  mounted () {

  },
  methods: {
    async getNewsList () {
      const { data: res } = await this.$http.get('api/getnewslist')
      if (res.meta.status !== 200) return this.$toast('获取列表失败')
      this.newsList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  border-bottom: 1px solid #ccc;
  height: 60px;
  padding: 0 10px;
  img {
    height: 95%;
    float: left;
    margin-right: 10px;
  }
  h3 {
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0;
    font-size: 15px;
    text-overflow: ellipsis; //溢出用省略号显示
    overflow: hidden; // 溢出隐藏
    white-space: nowrap; //强制不换行
  }
  p {
    padding: 0;
    margin: 0;
    display: flex;
    height: 20px;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #226aff;
    }
  }
}
</style>
