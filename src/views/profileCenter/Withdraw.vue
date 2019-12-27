<template>
  <div class="my-withdraw">
    <publicHeader :icon="true" name="我要提现" right="提现记录" url="/profileCenter/WithdrawRecord"></publicHeader>
    <div class="withdraw-list">
      <van-cell is-link @click="showPopup">
        <span slot="title">分润提现到</span>
        <span slot="default">{{splitWay}}</span>
      </van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
        <van-picker :columns="columns" :default-index="1" show-toolbar title="提现方式" @cancel="onCancel" @confirm="onConfirm" />
      </van-popup>
      <div class="split-group">
        <div class="split-wrapper">
          <van-cell>
            <span slot="title">分润余额：</span>
            <span slot="default" class="split-balance">￥{{splitBalance}}</span>
          </van-cell>
          <van-field v-model="withdrawMoney" label="提现金额：" placeholder="请输入" input-align="right" />
          <div class="up-btn">
            <van-button type="primary" size="large">提现</van-button>
          </div>
        </div>
      </div>
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
.split-balance {
  font-size: 0.4rem;
  line-height: 0.533333rem;
  color: #333333;
}
.split-group {
  background-color: #f5f5f5;
  padding-top: 0.213333rem;
  .split-wrapper {
    background-color: #fff;
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
}
</style>