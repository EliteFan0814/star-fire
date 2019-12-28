<template>
  <!-- 收款账户设置 -->
  <div class="receive-set">
    <publicHeader :icon="true" name="修改收款账户"></publicHeader>
    <van-cell-group>
      <van-field clearable input-align="right" v-model="upData.account" :label="`${upData.type_str}账户：`" placeholder="请输入账户名" />
      <van-field clearable input-align="right" v-model="upData.phone" :label="`联系电话：`" placeholder="请输入联系电话" />
      <van-field clearable input-align="right" v-model="upData.realname" :label="`真实姓名：`" placeholder="请输入姓名" />
      <van-field v-model="upData.verify" center clearable label="短信验证码：" placeholder="验证当前账户手机号">
        <van-button slot="button" size="small" type="primary" @click="sendVerify">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="change-QR">
      <div class="pay-QR">
        <div class="QR-inner">
          <!-- <img src="@/assets/personal/payQR.png" alt=""> -->
          <img :src="upData.money_code" alt="">
          <span>点击图片选择新的二维码</span>
          <div class="up-img-btn">
            <van-uploader :after-read="afterUpImg">
              <van-button icon="photograph" type="primary" size="large"></van-button>
            </van-uploader>
          </div>

        </div>
      </div>
    </div>
    <div class="up-btn">
      <van-button type="primary" size="large" @click="upNewData">确定</van-button>
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
      upData: {
        type_str: '',
        type: '',
        money_code: '',
        account: '',
        realname: '',
        phone: '',
        verify: ''
      },
      accountPhone: ''
    }
  },
  created() {
    this.upData.type = this.$route.query.account
    this.getAccountPhone()
    this.getAccount(this.upData.type)
  },
  methods: {
    getAccount(accountType) {
      this.$http.get('/member/cash_account/lists').then(res => {
        res.data.list.map(item => {
          if (item.type === accountType) {
            this.upData = { ...this.upData, ...item }
          }
        })
      })
    },
    upNewData() {
      console.log(this.upData)
      this.$http
        .post('/member/cash_account/edit', { ...this.upData })
        .then(res => {
          if (res.code) {
            this.$toast.success('修改成功！')
            this.$router.go(-1)
          }
        })
    },
    // 上传图片
    afterUpImg(file) {
      if (file) {
        let payQRFile = file.file
        let form = new FormData()
        form.append('file', payQRFile)
        this.$http
          .post('/member/image/upload', form)
          .then(res => {
            if (res.code === 1) {
              this.upData.money_code = res.data.fileurl
            }
          })
          .catch(err => {})
      }
    },
    // 发送验证码
    sendVerify() {
      if (this.accountPhone) {
        this.$http
          .post('/member/pub/sendSms', { phone: this.accountPhone })
          .then(res => {
            this.$toast.success('验证码发送成功！')
            console.log(res)
          })
      } else {
        this.$toast.fail('请输入正确手机号！')
      }
    },
    // 获取账户手机号
    getAccountPhone() {
      this.$http.get('/member/member/info').then(res => {
        this.accountPhone = res.data.info.phone
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.receive-set {
  .change-QR {
    // border: 1px solid red;
    .pay-QR {
      margin: 0.533333rem;
      border-bottom: 1px solid #e6e6e6;
      font-size: 0.4rem;
      line-height: 0.533333rem;
      // color: #ff5f5f;
      .QR-inner {
        position: relative;
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
        .up-img-btn {
          position: absolute;
          top: 2%;
          left: center;
          button {
            background-color: transparent;
            width: 3.466667rem;
            height: 3.466667rem;
            border: none;
          }
        }
      }
    }
  }
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