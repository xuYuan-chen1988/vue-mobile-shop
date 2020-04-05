<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="(item , i) in goodslist"
      :key="i"
      to="/home/goods/goodsinfo"
    >
      <img :src="item.img_url" />
      <h2 class="title">{{item.title}}</h2>
      <div class="info">
        <p class="price">
          <span class="now">¥{{ item.sellprice}}</span>
          <span class="old">¥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>-->
    <!-- 在网页中有 2中跳转方式 -->
    <!-- 方式一:  使用a标签的方式进行跳转,叫做标签跳转-->
    <!-- 方式二:  使用 window.location.href的方式,叫做编程式导航-->
    <div class="goods-item" v-for="(item , i) in goodslist" :key="i" @click="goDetail(item.id)">
      <img :src="item.img_url" />
      <h2 class="title">{{item.title}}</h2>
      <div class="info">
        <p class="price">
          <span class="now">¥{{ item.sellprice}}</span>
          <span class="old">¥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <van-button type="info" size="large" @click="getmore">加载更多</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageindex: 1, // 默认获取第一个的数据
      goodslist: [
        // {
        //   id: 123,
        //   title: '罗技k310防水有线复古键盘懒人全身可水洗',
        //   sellprice: 199,
        //   market_price: 299,
        //   stock_quantity: 188,
        //   zhaiyao: '',
        //   click: 10,
        //   img_url: 'https://img.alicdn.com/imgextra/i2/2207239419714/O1CN01ol8lvH2Ld3y28K84u_!!2207239419714.png',
        //   add_time: new Date()
        // }
      ] // 商品列表的数组
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList () {
      // 获取商品列表数据
      const { data: res } = await this.$http.get('api/getgoodslist?pageindex=' + this.pageindex)
      if (res.meta.status !== 200) return this.$toast('获取商品列表失败!')
      // console.log(res.data)
      this.goodslist = this.goodslist.concat(res.data)
    },
    getmore () {
      this.getGoodsList()
    },
    goDetail (id) {
      // 注意: 一定要区分 this.$route 和this.$router 这两个对象
      // 其中: this.$route 是路由[参数对象],所有路由中的参数, params.query 都属于他
      // 其中: this.$router 是一个路由[导航对象],用它 可以方便的使用 js代码 ,实现路由的前进,后退,跳转到新的url地址
      // 1. 最简单的方式
      // this.$router.push('/home/goods/goodsinfo/' + id)
      // 2.传递对象
      // this.$router.push({ path: '/home/goods/goodsinfo/' + id })
      // 3. 用name,传递一个命名的路由
      this.$router.push({ name: 'goodsinfo', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    box-sizing: border-box;
    padding: 2px;
    display: flex;
    // 改变主轴方向为Y轴
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
      height: 220px;
    }
    .title {
      font-size: 14px;
      font-weight: 500;
    }
    .info {
      background-color: #ddd;
      .price {
        padding: 5px;
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          font-size: 12px;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        font-size: 13px;
        justify-content: space-between;
        padding: 5px;
      }
    }
  }
}
</style>
