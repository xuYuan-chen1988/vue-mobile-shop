<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in images" :key="index">
        <van-image width="100%" height="100%" lazy-load :src="item" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in griddata"
        :key="item.icon"
        :to="item.router"
        :icon="item.icon"
        :text="item.text"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-3.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg'
      ],
      griddata: [
        {
          icon: 'location-o',
          router: '/home/newslist',
          text: '新闻资讯'
        }, {
          router: '/home/photolist',
          icon: 'photo-o',
          text: '图片分享'
        }, {
          router: '/home/goods/goodslist',
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
  color: #111;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 250px;
}
</style>
