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
              color="#40a3ff"
              v-if="isShow"
              type="info">获取验证码</van-button>
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
            :disabled="isCode"
            placeholder="请输入微信号"
            v-model="inviteCode"
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
            v-model="name"
            class="ipt">
        </div>

        <div class="mid-account">
          <span><span class="red">* </span>确认密码</span>
          <input type="text"
            placeholder="再次输入密码"
            v-model="trueName"
            class="ipt">
        </div>
        <div class="xieyi">
          <van-checkbox v-model="checked"
            checked-color="#83ced9"> 我阅读并同意
            <span style="color:#83ced9;font-size: 1.2rem;"
              @click.stop="jump">《用户协议》</span>
          </van-checkbox>

        </div>
        <div class="mid-btn">
          <button @click.stop="reg">提交注册</button>
          <div>如有任何疑问，请联系客服</div>
        </div>
      </div>

      <van-popup v-model="show"
        position="bottom"
        :style="{ height: '40%' }">
        <h2>用户协议</h2>
        <div class="textBox"
          v-html="content">

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
      pwd: '',
      pwdTwo: '',
      smsCode: '',
      inviteCode: '',
      trueName: '',
      name: '',
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
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
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
      if (!this.name) {
        this.$toast('请输入昵称')
        return
      }
      if (!this.trueName) {
        this.$toast('请输入真实姓名')
        return
      }
      if (!this.checked) {
        this.$toast('请阅读并勾选注册协议')
        return
      }

      this.$http
        .post('/api/Member/Register', {
          mobile: this.mobile,
          smsCode: this.smsCode,
          inviteCode: this.inviteCode,
          pwd: this.pwd,
          name: this.name,
          trueName: this.trueName
        })
        .then(res => {
          if (res.success) {
            this.$toast('注册成功')
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
      this.$http
        .post('/api/SMS/RegSMSCode', {
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
    jump() {
      this.show = true
      // this.$router.push({
      //   name: 'xieyi'
      // })
    },
    getData() {
      this.$http
        .get('/api/Article/GetOneByType?type=user_agreement')
        .then(res => {
          this.content = res.value.content
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
  padding: 0 2rem;
}
.red {
  color: #ff5f5f;
}
.mid {
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  .ipt {
    flex: 1;
    height: 4rem;
    border: none;
  }
  .short {
    width: 10rem ;
  }
  .mid-account{
    margin-top: 1rem;
    display: flex;
    border-bottom: 1px solid rgb(221, 221, 221);
    > span {
      width: 8rem;
      line-height: 4rem;
      text-align: left;
    }
    .van-button {
      margin: 0.7rem 0;
    }
    .van-button--small {
      min-width: 85px;
    }
  }
  .mid-btn {
    position: absolute;
    margin: 0 4rem;
    align-items: center;
    font-size: 1.4rem;
    bottom: 50px;
    button {
      height: 4rem;
      width: 26.8rem;
      border-radius: 2rem;
      background: #03d13e;
      color: #fff;
      border: none;
    }
    > div {
      padding: 2rem;
      color: #999;
      font-size: 1.2rem;
    }
  }
}
.xieyi {
  display: flex;
  margin: 1rem 0;
  .van-checkbox {
    font-size: 1.1rem;
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
    padding: 2rem;
  }
}
</style>
<style>
</style>
