<template>
  <div class="up-apply">
    <publicHeader :icon="true" name="升级申请"></publicHeader>
    <div class="top-slogan">
      <div class="line"></div>
      <span> 扫描二维码，支付升级 </span>
      <div class="line"></div>
    </div>
    <div class="apply-form">
      <van-cell-group>
        <van-cell title="订单编号" value="20191225058" />
        <van-cell>
          <span slot="title">V1区县代理升级金额</span>
          <span slot="default" class="warn-text">￥10.00</span>
        </van-cell>
        <van-cell is-link @click="showPopup">
          <span slot="title">支付方式</span>
          <span slot="default" class="warn-pay">{{splitWay}}</span>
        </van-cell>
        <van-cell title="联系人姓名" value="范跑跑" />
        <van-cell title="联系人电话" value="15874521114" />
        <van-cell title="支付账号" value="sdg2548754" />
        <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
          <van-picker :columns="columns" :default-index="1" show-toolbar title="支付方式" @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="pay-QR">
      <img src="@/assets/personal/payQR.png" alt="">
      <span>支付时，请备注订单编号后四位</span>
    </div>
    <div class="up-img">
      <div class="up-text"><span>上传支付凭证</span><span class="up-warn">（支付完成后，请截图保存哦）</span></div>
      <div class="up-addimg">
        <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
      </div>
      <div class="up-express">
        <p>规则说明：</p>
        <p>1.规则说明xxx规则说明xxxxxxxx</p>
        <p>2.xxxxxxxx规则说明xxxxxxx</p>
        <p>3.xxx规则说明xxxx规则说明xxxxxxxx</p>
      </div>
      <div class="btom-btn">
        <van-button type="primary" size="large">提交审核</van-button>
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
      withdrawMoney: '',
      fileList: []
    }
  },
  methods: {
    afterRead(file) {
      console.log(file)
    },
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
.up-apply {
  .top-slogan {
    padding: 0.2rem 0;
    background-color: #f5f5f5;
    font-size: 0.4rem;
    line-height: 0.533333rem;
    color: #03d13e;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      margin: 0 0.266667rem;
      width: 0.666667rem;
      flex-basis: 40px;
      border-top: 1px solid #03d13e;
    }
  }
  .apply-form {
    font-size: 0.4rem;
    line-height: 0.533333rem;
    color: #333333;
    .van-cell__value {
      color: #333333;
    }
    .warn-text {
      color: #ff5f5f;
    }
  }
  .pay-QR {
    margin: 0.533333rem;
    border-bottom: 1px solid #e6e6e6;
    font-size: 0.4rem;
    line-height: 0.533333rem;
    color: #ff5f5f;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 3.466667rem;
      height: 3.466667rem;
      box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      padding: 0.133333rem;
    }
    span {
      margin-top: 0.533333rem;
      margin-bottom: 0.666667rem;
    }
  }
  .up-img {
    margin: 0.4rem 0.533333rem;
    .up-text {
      margin-bottom: 0.4rem;
      font-size: 0.4rem;
      line-height: 0.533333rem;
      color: #333333;
      .up-warn {
        font-size: 0.32rem;
        color: #ff5f5f;
      }
    }
    .up-express {
      margin-top: .4rem;
      font-size: 0.32rem;
      line-height: 0.533333rem;
      color: #000000;
      p {
        margin: 0;
      }
    }
    .btom-btn {
      text-align: center;
      margin: .533333rem 0;
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