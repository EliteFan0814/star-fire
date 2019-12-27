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
          @click="handleFor">找回密码</div>
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
      this.$http.post('/member/pub/login', {
          account: this.mobile,
          password: this.pwd,
        })
        .then(res => {
          if (res.code == 1) {
            this.LOG_IN({
              token: res.data.mytoken.token
            })
            this.$router.push({ name: 'index' })
          } else {
            this.$toast(res.msg)
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
  padding: .666667rem 1.573333rem;
  min-height: 7.733333rem;
  text-align: center;
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
  border-radius: .266667rem;
  img {
    width: 2.43rem;
    height:  2.43rem;
    border-radius: .2rem;
    box-shadow: 0 0 6px rgb(2, 5, 27);
  }
}
.mid {
  padding-top: 1.333333rem;
  .mid-account {
    width: 100%;
    margin-top: .333333rem;
    height: .9rem;
    text-align: left;
    border-bottom: .013333rem solid #fff;
    display: flex;
    box-sizing: border-box;
    
    i {
      color: #fff;
      font-size: .6rem;
      width: 1rem;
    }
    .ipt {
      flex: 1;
      border: none;
      height: .666667rem;
      font-size: .4rem;
      width: 6rem;
      background: transparent;
      color: #fff;
    }
  }
  .mid-for {
    color: #fff;
    text-align: right;
    margin: .213333rem 0;
    font-size: .32rem;
  }
  .mid-btn {
    display: flex;
    flex-direction: column;
    color: #fff;
    width: 100%;
    margin-top: .666667rem;
    > div {
      width: 100%;
      height: 1.066667rem;
      border: 1px solid #fff;
      border-radius: 2rem;
      margin: .2rem 0;
     
      font-size: .4rem;
      line-height: 1.093333rem;
    }
    > div:active {
      background: #fff;
      color: #40a3ff;
    }
  }
  input::-webkit-input-placeholder {
    color: #ddd;
  }
}
</style>
