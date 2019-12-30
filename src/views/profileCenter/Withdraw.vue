<template>
  <div class="my-withdraw">
    <publicHeader :icon="true" name="我要提现" right="提现记录" url="/profileCenter/WithdrawRecord"></publicHeader>
    <div class="withdraw-list">
      <van-cell is-link @click="classPopup">
        <span slot="title">提现类型</span>
        <span slot="default">{{classWay}}</span>
      </van-cell>
      <van-popup v-model="showClass" position="bottom" :style="{ height: '35%' }">
        <van-picker :columns="classList" :default-index="0" show-toolbar title="提现类型" @cancel="onCancel" @confirm="confirmClass" />
      </van-popup>

      <van-cell is-link @click="accountPopup">
        <span slot="title">提现账户</span>
        <span slot="default">{{splitWay}}</span>
      </van-cell>
      <van-popup v-model="showAccount" position="bottom" :style="{ height: '35%' }">
        <van-picker :columns="accountList" :default-index="0" show-toolbar title="提现账户" @cancel="onCancel" @confirm="confirmAccount" />
      </van-popup>
      <div class="split-group">
        <div class="split-wrapper">
          <!-- <van-cell>
            <span slot="title">分润余额：</span>
            <span slot="default" class="split-balance">￥{{splitBalance}}</span>
          </van-cell> -->
          <van-field clearable v-model="upData.money" label="提现金额：" placeholder="请输入金额" input-align="right" />
          <div class="up-btn">
            <van-button type="primary" size="large" @click="upWithdraw">提现</van-button>
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
      showClass: false,
      showAccount: false,
      classList: ['余额', '佣金'],
      classValue: ['amount', 'reward'],
      classWay: '余额',
      classWayValue: 0,
      accountList: ['支付宝', '微信'],
      accountValue: ['ALI', 'WX'],
      splitWay: '支付宝',
      splitWayValue: 0,
      // splitBalance: '0.00',
      wxAccount: {},
      aliAccount: {},
      upData: {
        cash_type: '',
        type: '',
        money: ''
      }
    }
  },
  created() {
    this.getAccountList()
  },
  methods: {
    // 获取支付宝和微信账户信息 默认为 余额 支付宝 提现
    getAccountList() {
      this.$http.get('/member/cash_account/lists').then(res => {
        res.data.list.map(item => {
          if (item.type === 'WX') {
            this.wxAccount = item
          }
          if (item.type === 'ALI') {
            this.aliAccount = item
          }
        })
        this.upData.cash_type = 'amount'
        this.upData.type = 'ALI'
        this.upData = { ...this.upData, ...this.aliAccount }
        console.log('默认：', this.upData)
      })
    },
    classPopup() {
      this.showClass = true
    },
    accountPopup() {
      this.showAccount = true
    },
    onCancel() {
      this.showClass = false
      this.showAccount = false
    },
    // 提现类型选择
    confirmClass(value, index) {
      this.classWay = value
      this.classWayValue = this.classValue[index]
      this.upData.cash_type = this.classValue[index]
      // console.log(this.classWay,this.classWayValue)
      this.showClass = false
    },
    // 提现账户选择
    confirmAccount(value, index) {
      this.splitWay = value
      this.splitWayValue = this.accountValue[index]
      if (this.accountValue[index] === 'ALI') {
        this.upData = { ...this.upData, ...this.aliAccount }
      } else {
        this.upData = { ...this.upData, ...this.wxAccount }
      }
      // console.log(this.splitWay,this.splitWayValue)
      this.showAccount = false
    },
    upWithdraw() {
      console.log('提交：', this.upData)
      this.$http.post('/member/cash/apply',{...this.upData}).then(res=>{
        // console.log('res',res)
        if(res.code === 1){
          this.$toast.success(res.msg)
        }
      })
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
  // padding-top: 0.213333rem;
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