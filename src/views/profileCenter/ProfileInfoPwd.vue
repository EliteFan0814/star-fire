<template>
  <div class="profile-pwd">
    <publicHeader :icon="true" name="修改账户密码"></publicHeader>
    <div class="change-pwd">
      <van-cell-group>
        <van-field v-model="oldPwd" type="password" clearable label="旧密码：" placeholder="请输入旧密码" required />
        <van-field v-model="newPwd" type="password" clearable label="新密码：" placeholder="请输入新密码" required @focus="clearWarn" @blur="verifyPwd" :error-message="errMsg" />
      </van-cell-group>
    </div>
    <div class="up-btn">
      <van-button type="primary" size="large" @click="changePwd">确认修改</van-button>
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
      oldPwd: '',
      newPwd: '',
      errMsg: '',
      errFlag: false
    }
  },
  methods: {
    //离开时验证
    verifyPwd(event) {
      if (this.newPwd.length < 6 || this.newPwd.length > 16) {
        this.errMsg = '请输入6到16位密码'
        this.errFlag = true
      } else {
        this.errMsg = ''
        this.errFlag = false
      }
    },
    // 进入时撤销错误提示
    clearWarn(event) {
      this.errMsg = ''
    },
    changePwd() {
      if (!this.errFlag) {
        this.$http
          .post('/member/member/chgPwd', { old: this.oldPwd, password: this.newPwd })
          .then(res => {
            if(res.code){
              this.$toast.success(res.msg)
              // this.$router.go(-1)
            }
          })
      }
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