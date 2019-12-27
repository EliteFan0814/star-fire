<template>
  <div class="profile-info">
    <publicHeader :icon="true" name="修改个人信息"></publicHeader>
    <van-row>
      <van-col offset="1" span="22">
        <div class="setting-profile">
          <div class="left-avatar">
            <div class="inner-avatar">
              <img v-if="info.thumb" :src="info.thumb" alt="avatar">
              <img v-else src="@/assets/index/logo.png" alt="avatar">
            </div>
            <div class="up-img-btn">
              <van-uploader :after-read="afterUpImg">
                <van-button icon="photograph" type="primary" size="large"></van-button>
              </van-uploader>
            </div>
          </div>
          <div class="right-info">
            <van-cell-group>
              <van-field v-model="info.nickname" label="昵称：" placeholder="请输入昵称" />
              <van-field v-model="info.realname" label="真实姓名：" placeholder="请输入姓名" />
              <van-field v-model="info.wx_account" label="微信号：" placeholder="请输入微信号" />
            </van-cell-group>
          </div>
        </div>
      </van-col>
    </van-row>
    <div class="set-sens-info">
      <van-cell-group>
        <van-cell title="修改账户密码" is-link to="/profileCenter/ProfileInfoPwd" />
        <van-cell title="更换绑定手机" is-link to="/profileCenter/ProfileInfoPhone" />
        <!-- <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field> -->
      </van-cell-group>
    </div>
    <div class="up-btn">
      <van-button type="primary" size="large" @click="setProfile">确认修改</van-button>
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
      info: {}
      // userName: '范跑跑',
      // phone: '12587458885',
      // fileList: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }]
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    // 获取个人信息
    getProfile() {
      this.$http.get('/member/member/info').then(res => {
        console.log(res)
        this.info = res.data.info
      })
    },
    // 上传图片
    afterUpImg(file) {
      if (file) {
        let avatarFile = file.file
        let form = new FormData()
        form.append('file', avatarFile)
        this.$http
          .post('/member/image/upload', form)
          .then(res => {
            if (res.code === 1) {
              this.info.thumb = res.data.fileurl
            }
          })
          .catch(err => {})
      }
    },
    // 修改个人信息
    setProfile() {
      this.$http
        .post('/member/member/edit', {
          ...this.info
        })
        .then(res => {
          // console.log(res.msg)
          if (res.code === 1) {
            this.$toast.success(res.msg)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-info {
  .setting-profile {
    display: flex;
    align-items: center;
    .left-avatar {
      position: relative;
      .inner-avatar {
        width: 2rem;
        height: 2rem;
        border: 0.026667rem solid #f5f5f5;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      .up-img-btn {
        // border: 1px solid red;
        position: absolute;
        top: 0;
        left: 0;
        button {
          background-color: transparent;
          width: 2rem;
          height: 2rem;
          border: none;
        }
      }
    }
    .right-info {
      .van-cell {
        padding-top: 0.133333rem;
        padding-bottom: 0.133333rem;
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