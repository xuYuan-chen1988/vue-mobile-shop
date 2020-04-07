<template>
  <div class="member-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        autocomplete
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    onSubmit (values) {
    }
  }
}
</script>

<style lang="less" scoped>
// .member-container {
//   .van-form {
//     // background-color: #ccc;
//   }
//   background-color: #ccc;
//   height: 100vh;
// }
</style>
