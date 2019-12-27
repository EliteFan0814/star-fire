<template>
  <div class="charge-money">
    <publicHeader :icon="true" name="充值"></publicHeader>
    <van-cell is-link @click="showPopup">
      <span slot="title">充值方式</span>
      <span slot="default">{{splitWay}}</span>
    </van-cell>
    <van-field v-model="withdrawMoney" label="充值金额：" placeholder="点击输入" input-align="right" />
    <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
      <van-picker :columns="columns" :default-index="1" show-toolbar title="提现方式" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
    <div class="up-btn">
      <van-button type="primary" size="large">充值</van-button>
    </div>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader'
export default {
  components: {
    publicHeader
  },
  data() {
    return {
      show: false,
      columns: ['支付宝', '微信', 'paypal'],
      splitWay: '微信',
      splitBalance: '0.00',
      withdrawMoney: ''
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value, index) {
      this.splitWay = value
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.charge-money {
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