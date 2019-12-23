<template>
  <div class="warner">
    <nav-bar :name="'忘记密码'"
      :icon="true" />
    <!-- <div class="top">已向您135****7890的手机号发送了1条验证码</div> -->
    <van-field v-model="mobile"
      label="手机号码"
      input-align="right"
      placeholder="请输入手机号码" />

    <van-field v-model="smsCode"
      input-align="right"
      label="短信验证码"
      placeholder="请输入短信验证码">
      <van-button slot="button"
        size="small"
        @click.prevent="handleSms"
        v-if="isShow"
        color="#83ced9"
        type="primary">发送验证码</van-button>
      <van-button slot="button"
        v-else
        size="small"
        color="#83ced9"
        disabled
        type="info">{{time}}S</van-button>
    </van-field>

    <van-field v-model="pwd"
      label="新的密码"
      input-align="right"
       type="password"
      placeholder="请输入新的密码" />
    <van-field v-model="surePwd"
      label="重复新的密码"
      input-align="right"
      type="password"
      placeholder="请确认新的密码" />

    <van-button @click="sure"
      color="#83ced9"
      :loading="false"
      type="info"
      class="btnBot"
      loading-text="">确认更改</van-button>
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
import { clearInterval } from 'timers';
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    navBar
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
        .post('/api/SMS/FindPwdSMSCode', {
          mobile: this.mobile,
          UserType: 9
        })
        .then(res => {
          if (res.success) {
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
    sure() {
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
        .post('/api/Login/AuthenticateForgetPwd', {
          Mobile: this.mobile,
          SmsCode: this.smsCode,
          UserType: 9
        })
        .then(res => {
          if (res.success) {
            this.LOG_IN({
              token: res.token,
              userId: res.user.id
            })

            this.$http
              .post('/api/Member/SetPwd', {
                smsCode: this.smsCode,
                pwd: this.pwd
              })
              .then(res => {
                if (res.success) {
                  this.$toast('密码修改成功，请重新登录')
                  var timer = setInterval(() => {
                    this.$router.push({ name: 'login' })
                    window.clearInterval(timer)
                  }, 1500)
                }
              })
              .catch(err => {})
          }
        })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.warner {
  padding-top: 12px;
}
.top {
  font-size: 1.2rem;
  height: 4.1rem;
  width: 28rem;
  background: #f5f5f5;
  margin: 1.3rem auto;
  text-align: center;
  line-height: 4.1rem;
  color: #999;
}
.btnBot {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 1.4rem;
}
</style>

