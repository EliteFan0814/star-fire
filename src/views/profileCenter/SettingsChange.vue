<template>
  <!-- 收款账户设置 -->
  <div class="receive-set">
    <publicHeader :icon="true" name="修改收款账户"></publicHeader>
    <van-cell-group>
      <van-field label-width="2.666667rem" input-align="right" v-model="value" label="支付宝账户名：" placeholder="请输入账户名" />
    </van-cell-group>
    <div class="up-btn">
      <van-button type="primary" size="large">确定</van-button>
    </div>
  </div>

</template>

<script>
import publicHeader from '@/components/publicHeader'
export default {
  components: {
    publicHeader
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.receive-set {
  .up-btn {
    display: flex;
    justify-content: center;
    margin-top: 2.933333rem;
    button {
      width: 6.853333rem;
      height: 1.066667rem;
      background-color: #03d13e;
      border-radius: 0.533333rem;
      font-size: 0.4rem;
      line-height: 0.533333rem;
      letter-spacing: 0.048rem;
      color: #fefefe;
    }
  }
}
</style>