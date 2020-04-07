<template>
  <div class="search-container">
    <h1>梦里寻他千百度</h1>
    <van-search v-model="value" shape="round" background="#ccc" placeholder="请输入搜索关键词" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
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
.search-container {
  background-color: #ccc;
  width: 100%;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 40px;
  bottom: 50px;
  h1 {
    text-align: center;
    font-size: 22px;
  }
}
</style>
