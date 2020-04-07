<template>
  <div class="shop_container">
    <!-- 商品列表区域 -->
    <ul class="goods-list">
      <h3 v-show="flag">购物车为空, 快去选购喜欢的商品吧</h3>
      <li class="card" v-for="(item, index) in goodslist" :key="item.id">
        <van-switch v-model="item.checked" @click="changeChecked(item)" />
        <img :src="item.thumb_path" />
        <div class="box">
          <h2>{{item.title}}</h2>
          <p>
            <span>¥{{item.sell_price}}</span>
            <van-stepper v-model="item.count" min="1" max="8" @change="changeCount(item)" />
            <input type="button" value="删除" @click="remove(item.id,index)" />
          </p>
        </div>
      </li>
    </ul>

    <!-- 结算区域 -->
    <van-submit-bar :price="totalAmount" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodslist: []
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      // 如果购物车中没有商品 就不用发起请求了
      if (this.$store.state.car.length === 0) return false
      var idArr = []
      this.$store.state.car.forEach(item => idArr.push(item.id))
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
        if (result.data.meta.status !== 200) return this.$toast('获取购物车商品失败!')
        this.goodslist = result.data.data
      })
    },
    changeChecked (item) {
      item.checked = !item.checked
      this.$store.commit('updateGoodsChecked', item)
    },
    changeCount (item) {
      this.$store.commit('updateGoodsInfo', item)
    },
    remove (id, index) {
      // 点击删除当前商品
      // 在store 中根据id删除,
      this.$store.commit('removeFormCar', id)
      // 在当前组件的的data 中根据index删除
      this.goodslist.splice(index, 1)
    },
    onSubmit () {

    },
    onClickEditAddress () { }
  },
  computed: {
    flag () {
      if (this.goodslist.length === 0) {
        return true
      } else {
        return false
      }
    },
    checkedAll: {
      get: function () {
        // 寻找 商品数据里面没有被选中的一项,如果找到返回 true, 需要取反(是否全部选中的逻辑是:有没有被选中的就返回false,没有没有被选中的就返回true)
        //  $$ 逻辑与运算符, 找到一个为空的值, 如果不为空,则返回 true
        if (this.goodslist.length === 0) return false
        return !this.goodslist.some(item => item.checked === false)
      },
      // 全选的点击事件 绑定到这里
      set: function () {
        // console.log(this.checkedAll)
        if (this.checkedAll === false) {
          this.goodslist.forEach(item => {
            item.checked = true
          })
        } else {
          this.goodslist.forEach(item => {
            item.checked = false
          })
        }
      }
    },
    totalAmount () {
      let n = 0
      this.goodslist.forEach(item => {
        if (item.checked === true) {
          n += item.sell_price * item.count
        }
      })
      return n * 100
    },
    totalNumber () {
      let n = 0
      this.goodslist.forEach(item => {
        if (item.checked === true) {
          n += item.count
        }
      })
      return n
    }
  }
}
</script>

<style lang="less" scoped>
.shop_container {
  padding: 5px 5px;
  .goods-list {
    h3 {
      text-align: center;
    }
    border: 1px solid #aaa;
    box-shadow: 0 0 8px #aaa;
    .card {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      border-bottom: 1px dotted #aaa;
      .van-switch {
        // top: 25px;
        left: 8px;
      }
      img {
        height: 100%;
      }
      .box {
        h2 {
          font-size: 13px;
        }
        p {
          margin-top: 5px;
          display: flex;
          align-items: center;
          span {
            color: red;
            width: 47px;
          }
          .van-stepper {
            border: 1px solid #aaa;
            margin: 0 10px;
          }
          input {
            border: 0;
            background-color: #fff;
            color: blue;
          }
        }
      }
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
