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
        <van-cell title="订单编号" :value="applyData.level_sn" />
        <van-cell>
          <span slot="title">升级为{{applyData.level_to_str}}金额</span>
          <span slot="default" class="warn-text">￥{{applyData.reward}}</span>
        </van-cell>
        <van-cell v-if="ifMember" is-link @click="showPopup">
          <span slot="title">支付方式</span>
          <span slot="default" class="warn-pay">{{splitWay}}</span>
        </van-cell>
        <van-cell title="联系人姓名" :value="applyData.check_info.realname || applyData.check_info.nickname" />
        <van-cell title="联系人电话" :value="applyData.check_info.phone" />
        <van-cell v-if="ifMember" title="支付账号" :value="finalAccount.account" />
        <van-popup v-model="show" position="bottom" :style="{ height: '35%' }">
          <van-picker :columns="columns" :default-index="0" show-toolbar title="支付方式" @cancel="onCancel" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="pay-QR">
      <!-- <img src="@/assets/personal/payQR.png" alt=""> -->
      <img  v-if="ifMember" :src="applyData.check_info.money_code_str" alt="">
      <img  v-else :src="finalAccount.money_code_str" alt="">
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
        <van-button type="primary" size="large" @click="upVerify">提交审核</van-button>
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
      columns: ['支付宝', '微信'],
      splitWay: '支付宝',
      splitBalance: '0.00',
      withdrawMoney: '',
      fileList: [],
      applyData: {},
      upData: {
        id: '',
        voucher: ''
      },
      aliAccount: {},
      weAccount: {},
      finalAccount: {}
    }
  },
  computed: {
    ifMember() {
      if (this.$route.query.applyType === 'member') {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.getData(this.$route.query.applyId)
    this.upData.id = this.$route.query.applyId
  },
  methods: {
    getData(id) {
      this.$http
        .get('/member/check_level/info', { params: { id } })
        .then(res => {
          console.log(res)
          if (res.code) {
            this.applyData = res.data
            if (res.data.cash_account) {
              res.data.cash_account.map(item => {
                if (item.type === 'WX') {
                  this.weAccount = item
                }
                if (item.type === 'ALI') {
                  this.aliAccount = item
                }
              })
              this.finalAccount = this.aliAccount
            }
          }
        })
    },
    afterRead(file) {
      if (file) {
        let avatarFile = file.file
        let form = new FormData()
        form.append('file', avatarFile)
        this.$http
          .post('/member/image/upload', form)
          .then(res => {
            if (res.code === 1) {
              // this.fileList[0] = res.data.fileurl_str
              this.upData.voucher = res.data.fileurl
            }
          })
          .catch(err => {})
      }
    },
    upVerify() {
      this.$http
        .post('/member/check_level/voucher', { ...this.upData })
        .then(res => {
          if (res.code) {
            this.$toast.success('提交审核成功！')
          }
        })
    },
    showPopup() {
      this.show = true
    },
    onCancel() {
      this.show = false
    },
    onConfirm(value, index) {
      this.splitWay = value
      if (index === 0) {
        this.finalAccount = this.aliAccount
      }
      if (index === 1) {
        this.finalAccount = this.weAccount
      }
      console.log(this.finalAccount);
      
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
      margin-top: 0.4rem;
      font-size: 0.32rem;
      line-height: 0.533333rem;
      color: #000000;
      p {
        margin: 0;
      }
    }
    .btom-btn {
      text-align: center;
      margin: 0.533333rem 0;
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