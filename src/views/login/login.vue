<template>
  <div class="all">
    <img class="bgimg" src="@/assets/index/indexBg.png" alt="">
    <div>
      <div class="top">
        <img src="@/assets/index/logo.png" alt="">
      </div>
      <div class="mid">
        <div class="mid-account">
          <input style="display:none" type="text" name="fakeusernameremembered"/>
          <input style="display:none" type="password" name="fakepasswordremembered"/>
          <i class="iconfont iconuser"></i>
          <input type="text" autocomplete="off"
            placeholder="请输入手机号"
            v-model="mobile"
            class="ipt">
        </div>
        <div class="mid-account">
          <i class="iconfont iconsuo"></i>
          <input type="password" autocomplete="off"
            placeholder="请输入密码"
            v-model="pwd"
            class="ipt">
        </div>
        <div class="mid-for"
          @click="handleFor">忘记密码?</div>
        <div class="mid-btn">
          <div plain round @click="loginBtn"> 登录</div>
          <div plain round @click="handleReg">注册</div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  components: {},
  data() {
    return {
      mobile: '',
      pwd: ''
    }
  },
  methods: {
    ...mapMutations(['LOG_IN']),
    loginBtn() {
      if (!this.mobile) {
        this.$toast('请输入手机号码')
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
      this.$http
        .post('/api/Login/Authenticate', {
          mobile: this.mobile,
          pwd: this.pwd,
          UserType: 9
        })
        .then(res => {
          if (res.success) {
            this.LOG_IN({
              token: res.token,
              userId: res.user.id
            })
            this.$router.push({ name: 'index' })
            if (res.message.errCode != 0) {
              this.$dialog
                .alert({
                  message: res.message.message
                })
                .then(() => {
                  // on close
                })
            }
          }
        })
        .catch(() => {})
    },
    handleReg() {
      this.$router.push({ name: 'registered' })
    },
    handleFor() {
      this.$router.push({ name: 'forgetPwd' })
    }
  }
}
</script>
<style lang="scss" scoped>
.all {
  padding: 3rem 6rem;
  min-height: 580px;
  .bgimg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    width: 100%;
  }
}
 
.top {
  img {
    width: 10px;
    height: 9.5rem;
  }
}
.mid {
  padding-top: 4rem;
  .mid-account {
    width: 100%;
    margin-top: 2rem;
    height: 3rem;
    text-align: left;
    border-bottom: 1px solid #fff;
    display: flex;
    box-sizing: border-box;
    
    i {
      color: #fff;
      font-size: 2.2rem;
      width: 3rem;
    }
    .ipt {
      flex: 1;
      border: none;
      height: 2.8rem;
      font-size: 1.6rem;
      width: 13rem;
      background: transparent;
      color: #fff;
    }
  }
  .mid-for {
    color: #fff;
    text-align: right;
    margin: 1rem 0;
    font-size: 1.2rem;
  }
  .mid-btn {
    display: flex;
    flex-direction: column;
    color: #fff;
    width: 100%;
    margin-top: 2rem;
    > div {
      width: 100%;
      height: 4rem;
      border: 1px solid #fff;
      border-radius: 2rem;
      margin: 1rem 0;
     
      font-size: 1.4rem;
      line-height: calc(4rem + 2px);
    }
    > div:active {
      background: #ccc;
    }
  }
  input::-webkit-input-placeholder {
    color: #ddd;
  }
}
</style>
