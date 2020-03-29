<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item v-for="item in griddata" :key="item.icon" :icon="item.icon" :text="item.text" />
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      griddata: [
        {
          icon: 'location-o',
          text: '新闻资讯'
        }, {
          icon: 'photo-o',
          text: '图片分享'
        }, {
          icon: 'point-gift-o',
          text: '商品购买'
        }, {
          icon: 'chat-o',
          text: '留言反馈'
        }, {
          icon: 'video-o',
          text: '视频专区'
        }, {
          icon: 'envelop-o',
          text: '联系我们'
        }
      ]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
