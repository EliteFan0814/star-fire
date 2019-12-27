<template>
  <div>
    <publicHeader :icon="true" name="账号注册"></publicHeader>
    <div class="mainBody">
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
          <span><span class="red"> </span>微信号</span>
          <input type="text"
            placeholder="请输入微信号"
            v-model="wxAccount"
            class="ipt">
        </div>
        <div class="mid-account">
          <span><span class="red">* </span>邀请码</span>
          <input type="text"
            :disabled="isCode"
            placeholder="请输入邀请码"
            v-model="inviteCode"
            class="ipt">
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
            placeholder="再次输入密码"
            v-model="pwdTwo"
            class="ipt">
        </div>
        <div class="xieyi">
          <van-checkbox v-model="checked"
            checked-color="#40a3ff"> 我阅读并同意
            <span style="color:#40a3ff;font-size: .32rem;"
              @click.stop="jump">《用户协议》</span>
          </van-checkbox>

        </div>
      </div>
      <div class="mid-btn">
        <button @click.stop="reg">提交注册</button>
        <div>如有任何疑问，请<a style="color: #999;text-decoration: underline" href="mqqwpa://im/chat?chat_type=wpa&uin=1078438924&version=1&src_type=web&web_src=oicqzone.com">联系客服</a></div>
      </div>
      <van-popup v-model="show"
        position="bottom"
        style="height: 40%; font-size: .32rem;">
        <h2>用户协议</h2>
        <div class="textBox" v-html="content">
        </div>
      </van-popup>
    </div>
  </div>
  
</template>
<script>
import publicHeader from '@/components/publicHeader'
import { mapMutations } from 'vuex'
import { clearInterval } from 'timers'
export default {
  components: {
    publicHeader
  },
  data() {
    return {
      mobile: '',
      wxAccount: '',
      pwd: '',
      pwdTwo: '',
      smsCode: '',
      inviteCode: '',
      content: '',
      isCode: false,
      isSms: false,
      time: 60,
      show: false,
      isShow: true,
      checked: false
    }
  },
  methods: {
    ...mapMutations(['LOG_IN']),
    reg() {
      if (!this.mobile) {
        this.$toast('请输入手机号')
        return
      }
      if (!/^1\d{10}$/.test(this.mobile)) {
        this.$toast('手机号码有误，请重填')
        return
      }
      if (!this.pwd) {
        this.$toast('请输入密码')
        return
      }

      if (!this.pwdTwo) {
        this.$toast('请确认密码')
        return
      }
      if (this.pwdTwo != this.pwd) {
        this.$toast('两次密码输入不一致')
        return
      }
      if (!this.smsCode) {
        this.$toast('请输入验证码')
        return
      }
      if (!this.inviteCode) {
        this.$toast('请输入邀请码')
        return
      }
      if (!this.checked) {
        this.$toast('请阅读并勾选注册协议')
        return
      }

      this.$http
        .post('/member/pub/register', {
          phone: this.mobile,
          verify: this.smsCode,
          spread_code: this.inviteCode,
          password: this.pwd,
          wx_account: this.wxAccount,
        })
        .then(res => {
          this.$toast(res.msg)
          if (res.code == 1) {
            setTimeout(() => {
              this.$router.push({ name: 'login' })
            }, 2000)
          }
        })
        .catch(err => {})
    },
    handleSms() {
      if (!this.mobile) {
        this.$toast('请输入手机号')
        return
      }
      this.$http.post('/member/pub/sendSms', {
        phone: this.mobile,
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
    jump() {
      this.show = true
    },
    getData() {
      this.$http.get('/member/article/info?id=1')
        .then(res => {
          this.content = res.data.info.content
        })
        .catch(err => {})
    }
  },
  created() {
    if (this.$route.query) {
      this.inviteCode = this.$route.query.inviteCode
      if (this.inviteCode) this.isCode = true
    }
    this.getData()
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.mainBody {
  text-align: center;
  min-height: 580px;  
  padding: 0 0.533333rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0; 
  justify-content: space-around;
}
.red {
  color: #ff5f5f;
}
.mid {
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
  // bottom: .32rem;
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
.xieyi {
  display: flex;
  margin: .32rem 0;
  .van-checkbox {
    font-size:.32rem;
  }
  span {
    padding-top: 0.12rem;
  }
}
input:disabled {
  background-color: #fff;
  color: silver;
}
.van-popup {
  h2 {
    text-align: center;
  }
  .textBox {
    text-align: left;
    padding: 0 .533333rem;
  }
}
</style>
<style>
</style>
