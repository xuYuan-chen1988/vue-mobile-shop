<template>
  <div>
    <van-tabs animated>
      <van-tab v-for="item in list" :title="item.title" :key="item.id">
        <router-link v-for="(img,i) in imageList" :key="i" :to="`photoinfo/`+ i" tag="li">
          <van-image :key="i" v-lazy="img" :src="img" fit="fill" />
        </router-link>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { title: '全部', id: 1, content: '全部' },
        { title: '风景', id: 2, content: '风景' },
        { title: '汽车', id: 3, content: '汽车' },
        { title: '动物', id: 4, content: '动物' },
        { title: '水果', id: 5, content: '水果' },
        { title: '美女', id: 6, content: '美女' },
        { title: '帅哥', id: 7, content: '帅哥' }
      ],
      imageList: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/apple-3.jpg',
        'https://img.yzcdn.cn/vant/apple-4.jpg'
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
</style>
