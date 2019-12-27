<template>
  <div class="warner">
    <publicHeader :name="'忘记密码'"
      :icon="true" />
    <!-- <div class="top">已向您135****7890的手机号发送了1条验证码</div> -->
    <div class="forgetBody">
      <div class="mid">
        <div class="mid-account">
          <span><span class="red">* </span>手机号</span>
          <input type="text"
            placeholder="请输入手机号"
            v-model="mobile"
            class="ipt">
        </div>
        <div class="mid-account">
          <span><span class="red">* </span>验证码</span>
          <div style="display: flex;flex: 1;">
            <input type="text"
              placeholder="请输入验证码"
              v-model="smsCode"
              class="ipt short">
            <van-button @click.prevent="handleSms"
              size="small"
              plain
              color="#40a3ff"
              v-if="isShow">获取验证码</van-button>
            <van-button size="small"
              color="#40a3ff"
              v-else
              disabled
              type="info">{{time}}S</van-button>
          </div>
        </div>
        <div class="mid-account">
          <span><span class="red">* </span>密码</span>
          <input type="text"
            placeholder="请输入密码"
            v-model="pwd"
            class="ipt">
        </div>
        <div class="mid-account">
          <span><span class="red">* </span>确认密码</span>
          <input type="text"
            placeholder="请再次输入密码"
            v-model="surePwd"
            class="ipt">
        </div>
      </div>
      <div></div>
      <div class="mid-btn">
        <van-button @click="submit"
          color="#03d13e"
          :loading="false"
          type="info"
          loading-text="">确认更改</van-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    publicHeader
  },
  props: {},
  data() {
    return {
      smsCode: '',
      pwd: '',
      surePwd: '',
      mobile: '',
      time: 60,
      isShow: true
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(['LOG_IN']),
    handleSms() {
      if (!this.mobile) {
        this.$toast('请输入手机号')
        return
      }
      this.$http
        .post('/member/pub/sendSms', {
          phone: this.mobile
        })
        .then(res => {
          this.$toast(res.msg)
          if (res.code == 1) {
            this.isShow = false
            var Timer = setInterval(() => {
              this.time--
              if (this.time <= 0) {
                window.clearInterval(Timer)
                this.isShow = true
                this.time = 60
              }
            }, 1000)
          }
        })
        .catch(err => {})
    },
    submit() {
      if (!this.mobile) {
        this.$toast('请输入电话')
        return
      }
      if (!this.smsCode) {
        this.$toast('请输入验证码')
        return
      }
      if (!this.pwd) {
        this.$toast('请输入密码')
        return
      }
      if (this.pwd != this.surePwd) {
        this.$toast('两次密码输入不一致')
        return
      }
      this.$http
        .post('/member/pub/findPwd', {
          phone: this.mobile,
          verify: this.smsCode,
          password: this.pwd
        })
        .then(res => {
          if (res.code == 1) {
            this.$toast('密码修改成功，请重新登录')
            var timer = setInterval(() => {
              this.$router.push({ name: 'login' })
              window.clearInterval(timer)
            }, 1500)
          } else {
            this.$toast(res.msg)
          }
        })
        .catch(err => {})
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.forgetBody {
  padding: 0 .533333rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.red {
  color: #ff5f5f;
}
.mid {
  // height: 300px;
  display: flex;
  flex-direction: column;
  font-size: .4rem;
  .ipt {
    flex: 1;
    height: 0.9rem;
    border: none;
  }
  .short {
    width: 3.333333rem;
  }
  .mid-account{
    margin-top: .2rem;
    display: flex;
    border-bottom: .013333rem solid rgb(221, 221, 221);
    > span {
      width: 2.4rem;
      line-height: 1rem;
      text-align: left;
    }
    .van-button {
      margin: .106667rem 0;
    }
    .van-button--small {
      min-width: 1.133333rem;
    }
  }
  
}
.mid-btn {
  align-items: center;
  font-size: .4rem;
  margin: 0 1.066667rem;
  button {
    height: 1.066667rem;
    width: 6.853333rem;
    border-radius: .533333rem;
    background: #03d13e;
    color: #fff;
    border: none;
  }
  button:active {
    color: #03d13e;
    background: #fff;
    border: 1px solid #03d13e;
  }
  > div {
    padding: .4rem;
    color: #999;
    font-size: .32rem;
  }
  
}
</style>

