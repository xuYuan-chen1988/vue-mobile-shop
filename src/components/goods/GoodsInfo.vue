<template>
  <div class="goodsinfo-container">
    <!-- 点击购物车的小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ballRef"></div>
    </transition>
    <!-- 自己实现卡片视图 -->
    <!-- 商品轮播图区域 -->
    <div class="card">
      <van-swipe :autoplay="3000" id="myswipe">
        <van-swipe-item v-for="(image, index) in lunbotu" :key="index">
          <img v-lazy="image" width="100%" height="250px" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品购买区域 -->
    <div class="card">
      <h3>{{goodsinfo.title}}</h3>
      <hr />
      <p class="price">
        市场价:
        <del>¥{{goodsinfo.market_price}}</del>
        <span class="nowprice">销售价：¥{{goodsinfo.sell_price}}</span>
      </p>
      <p class="number">
        购买数量：
        <van-stepper v-model="value" :max="goodsinfo.stock_quantity" />
      </p>
      <p class="button">
        <van-button type="info">立即购买</van-button>
        <van-button type="danger" @click="addToShopCar">加入购物车</van-button>
        <!-- 分析 如何实现,加入购物车的时候,拿到选择的 数量 -->
        <!-- 1. 经过分析:按钮属于 goodsinfo 页面,数字属于 numberbox 组件 -->
        <!-- 2. 由于 涉及到了父子组件的嵌套了,所以无法 直接在 goodsinfo 页面 中 获取到选中商品的数量值 -->
        <!-- 3. 怎么解决这个问题:涉及到了子组件向 父组件传值了(事件调用机制) -->
        <!-- 4. 事件调用的本质, 父向子传递方法,子组件调用这个方法,同时把数据当做参数,传递这个方法 -->
        <!--  父组件在引用子组件的时候给子组件传递一个方法 ,子组件在 this.$emit('方法名',参数) 传递数据给父组件-->
      </p>
    </div>
    <!-- 商品参数区域 -->
    <div class="card">
      <h3>商品参数</h3>
      <hr />
      <p>商品货号：{{goodsinfo.goods_no}}</p>
      <p>库存情况：{{goodsinfo.stock_quantity}} 件</p>
      <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
      <hr />
      <van-button plain type="primary" size="large" @click="goDesc(id)">图文介绍</van-button>
      <van-button plain type="danger" size="large" @click="goComment(id)">商品评论</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      lunbotu: [], // 轮播图的url 数据
      value: 1,
      goodsinfo: {},
      ballFlag: false // 控制小球隐藏和显示的标识符
    }
  },
  created () {
    this.getLunbotu()
    this.getGoodsInfo()
  },
  mounted () {

  },
  methods: {
    getLunbotu () {
      this.$http.get('get/getthumimages/' + this.id).then(result => {
        if (result.data.meta.status !== 200) return this.$toast('获取轮播图数据失败')
        this.lunbotu = result.data.data
      })
    },
    async getGoodsInfo () {
      const { data: res } = await this.$http.get('api/goods/getinfo/' + this.id)
      // console.log(res)
      if (res.meta.status !== 200) return this.$toast('获取商品数据失败!')
      this.goodsinfo = res.data
    },
    goDesc (id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment (id) {
      // 点击使用编程式导航跳转到 评论页面
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    addToShopCar () {
      // 添加到购物车
      this.ballFlag = true
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0,0)'
    },
    enter (el, done) {
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth

      // 小球动画优化思路
      // 1.分析导致动画不准确的原因:我们把小球最终位移到的位置,已经局限在了某一分辨率下的滚动条未滚动的情况下
      // 2.只要分辨率和测试的时候不一样,或者滚动条有一定的滚动距离之后,问题就出现了
      // 3. 因此,我们经过分析得到结论 不能把位移的 横纵坐标直接写死了,而是应该根据不同的情况,动态计算这个坐标值
      // 4.经过分析,得出解题思路,先得到徽标的横纵坐标,再得到小球横纵坐标,然后 然后让y值 求差,x求差,得到的结果,就是横纵坐标要位移的距离
      // 5. 如何对获取徽标和小球的位置??? domObject.getBoundingClientRect()
      const ballPosititon = this.$refs.ballRef.getBoundingClientRect()
      // 获取徽标在页面中的位置
      const badgePosition = document.getElementById('shopCar').getElementsByClassName('van-info')[0].getBoundingClientRect()
      // console.log(badgePosition)
      const xDist = badgePosition.left - ballPosititon.left
      const yDist = badgePosition.top - ballPosititon.top
      el.style.transform = `translate(${xDist}px,${yDist}px)`
      // el.style.transition = 'all 1s cubic-bezier(.32,-0.24,.33,1.09)'
      el.style.transition = 'all .5s ease'

      done()
    },
    afterEnter (el) {
      this.ballFlag = false
    },
    getSelectedCount (Count) { }
  },
  watch: {
    // 可以监听 传过来的值的改变(比如父组件的数据是异步获取的,此时用监听比较合适,否则可能没有数据,父组件间传过来的值在 props:[] 里接收)
  }
}
</script>

<style lang="less" scoped>
.goodsinfo-container {
  overflow: hidden;
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    top: 380px;
    left: 142px;
    position: absolute;
    z-index: 99;
  }
  .card {
    padding: 0 15px;
    min-height: 30px;
    height: 100%;
    margin: 5px 6px;
    border: 1px solid #999;
    box-shadow: 0 0 8px #999;
  }
  h3 {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }
  .price {
    font-size: 14px;
    margin-top: 20px;
    padding-top: 10px;
    .nowprice {
      padding-left: 10px;
      color: red;
      font-weight: 900;
    }
  }
  .number {
    padding-top: 10px;
    line-height: 28px;
    display: flex;
    // justify-content: space-between;
    .van-stepper {
      margin: 0 15px;
      border: 1px solid #ccc;
    }
  }
  .button {
    padding-top: 10px;
    margin-bottom: 20px;
    .van-button {
      margin-right: 10px;
      width: 100px;
    }
  }
  p {
    font-size: 13px;
    margin: 15px 0;
  }
  .van-button {
    margin: 5px 0;
  }
}
</style>
