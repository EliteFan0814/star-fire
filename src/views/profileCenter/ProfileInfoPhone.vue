<template>
  <div class="profile-pwd">
    <publicHeader :icon="true" name="验证原手机"></publicHeader>
    <div class="change-pwd">
      <van-cell-group>
        <!-- <van-field v-model="oldPwd" type="text" clearable label="验证原手机：" placeholder="请输入验证码"  /> -->
        <!-- <van-field v-model="newPwd" type="text" clearable label="绑定新手机：" placeholder="请输入验证码"  @focus="clearWarn" @blur="verifyPwd" :error-message="errMsg" /> -->
        <van-cell title="原手机号：" :value="oldPhone" />
        <van-field clearable v-model="oldPhoneVerify" center label="验证原手机：" placeholder="输入原手机验证码">
          <van-button slot="button" size="small" type="primary" @click="sendVerify(oldPhone)">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="up-btn">
      <van-button type="primary" size="large" @click="verifyOldPhone">点击验证</van-button>
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
      oldPhone: '',
      oldPhoneVerify: ''
    }
  },
  created() {
    this.getAccountPhone()
  },
  methods: {
    getAccountPhone() {
      this.$http
        .get('/member/member/info')
        .then(({ data: { info: { phone } } }) => {
          this.oldPhone = phone
        })
    },
    // 发送验证码
    sendVerify(phone) {
      this.$http.post('/member/pub/sendSms', { phone }).then(res => {
        if (res.code) {
          this.$toast.success(res.msg)
        }
      })
    },
    // 验证原手机
    verifyOldPhone() {
      this.$http
        .post('/member/member/checkPhone', {
          verify: this.oldPhoneVerify
        })
        .then(res => {
          if (res.code) {
            this.$toast.success(res.msg)
            this.$router.push({name:'ProfileInfoPhoneNew'})
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-pwd {
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