<template>
  <!-- 收款账户设置 -->
  <div class="receive-set">
    <publicHeader :icon="true" name="收款账户设置"></publicHeader>
    <div class="pay">
      <div class="all-pay ali-pay">
        <div class="pay-wrapper">
          <div class="account"><span class="left-text">支付宝账号：</span><span>{{aliAccount.account}}</span></div>
          <div class="account"><span class="left-text">手机号：</span><span>{{aliAccount.phone}}</span></div>
          <div class="account"><span class="left-text">姓名：</span><span>{{aliAccount.realname}}</span></div>
          <div class="change" @click="setChange('ALI')"><span>修改</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <div class="pay last-pay">
      <div class="all-pay we-pay">
        <div class="pay-wrapper">
          <div class="account"><span class="left-text">微信账号：</span><span>{{wxAccount.account}}</span></div>
          <div class="account"><span class="left-text">手机号：</span><span>{{wxAccount.phone}}</span></div>
          <div class="account"><span class="left-text">姓名：</span><span>{{wxAccount.realname}}</span></div>
          <div class="change" @click="setChange('WX')"><span>修改</span>
            <van-icon name="arrow" />
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
      wxAccount: {},
      aliAccount: {}
    }
  },
  created() {
    this.getAccountList()
  },
  methods: {
    setChange(account) {
      this.$router.push({
        name: 'SettingsChange',
        query: { account }
      })
    },
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pay {
  border-top: 1px solid transparent;
  .ali-pay {
    background-image: url(../../assets/personal/alipay.png);
  }
  .we-pay {
    background-image: url(../../assets/personal/wepay.png);
  }
}

.all-pay {
  width: 8.933333rem;
  height: 3.466667rem;
  border-radius: 0.16rem;
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: cover;
  background-clip: border-box;
  background-position: center;
  background-origin: border-box;
  margin: 0.533333rem auto;
  margin-bottom: 0;
  font-size: 0.4rem;
  line-height: 0.533333rem;
  letter-spacing: 0px;
  color: #ffffff;
  .pay-wrapper {
    padding-top: 0.186667rem;
    padding-left: 2.066667rem;
    .account {
      margin-top: 0.333333rem;
      .left-text {
        display: inline-block;
        // border: 1px solid red;
        width: 2.4rem;
        text-align: right;
      }
    }
    .change {
      float: right;
      margin-right: 0.4rem;
      font-size: 0.32rem;
      line-height: 0.32rem;
      letter-spacing: 0px;
      color: #ffffff;
      display: flex;
      align-items: center;
    }
  }
}
.last-pay {
  margin-top: 0;
}
</style>