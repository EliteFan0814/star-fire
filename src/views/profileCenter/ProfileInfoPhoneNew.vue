<template>
  <div class="profile-pwd">
    <publicHeader :icon="true" name="绑定新手机"></publicHeader>
    <div class="change-pwd">
      <van-cell-group>
        <van-field clearable v-model="newPhone" input-align="right" label="新手机号：" placeholder="请输入新手机号" />
        <van-field clearable v-model="newPhoneVerify" center label="手机验证码：" placeholder="输入新手机验证码">
          <van-button slot="button" size="small" type="primary" @click="sendVerify(newPhone)">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="up-btn">
      <van-button type="primary" size="large" @click="verifyNewPhone">确认修改</van-button>
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
      newPhone: '',
      newPhoneVerify: ''
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
          console.log(phone)
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
    // 绑定新手机
    verifyNewPhone() {
      console.log(this.newPhoneVerify)
      this.$http.post('/member/member/chgPhone', {
        phone: this.newPhone,
        verity: this.newPhoneVerify
      }).then(res => {
       if(res.code){
         this.$toast.success(res.msg)
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