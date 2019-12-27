<template>
<div class="tgMain">
  <img class="tgbg" src="@/assets/personal/tgbg.png" alt="">
  <div>
    <div class="tgIcon">
      <van-icon @click="goBack" name="arrow-left" size="18"/>
      <div :style="'opacity:' + opacity">我要推广</div>
      <div></div>
    </div>
    <div class="bgBody">
      <div>
        <img class="yhImg" src="@/assets/index/logo.png" alt="">
      </div>
      <div>哈撒及</div>
      <div>
        <img src="@/assets/personal/mxczltf.png" alt="">
      </div>
      <div>
        <img src="@/assets/personal/tjwh.png" alt="">
      </div>
      <div>
        <img src="@/assets/personal/ewmk.png" alt="">
        <img src="@/assets/index/1.png" alt="">       
      </div>
      <div>
        <div style="font-size: 18px; color: #333;">您的邀请码</div>
        <van-button class="tgBtn" size="small">VPD454</van-button>
        <div>        
          <img src="@/assets/personal/mfzc.png" alt="">       
        </div>
        <div class="wenzi">
          <p>阿迪噶发大水该罚的罚</p>
          <p>阿迪噶发大水该罚的罚</p>
          <p>阿迪噶发大水该罚的罚</p>          
        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import publicHeader from '@/components/publicHeader'
import { log } from 'util';
export default {
  components: {
    publicHeader
  },
  data() {
    return {
      opacity: 1
    }
  },
  mounted() {
    this.scrollListen();
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    scrollListen() {
      window.addEventListener('scroll',() => {
        this.opacity = 1 - ((document.documentElement.scrollTop || document.body.scrollTop) / 50)        
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.tgMain {
  font-size: .32rem;
  margin-top: -50px;
  height: 17.786667rem;
  overflow: scroll;
  text-align: center;
  .tgIcon {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 18px;
    .van-icon {
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    > :last-child {
      width: 40px;
    }
  }
}
.bgBody {
  padding-top: 60px;
  .yhImg {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
  }
  > div:nth-child(2) {
    color: #fff;
    letter-spacing:3px
  }
  > div:nth-child(3) img {
    margin-top: -.2rem;
    width: 7.4rem;
  }
  > div:nth-child(4) img {
    margin-top: .1rem;
    width: 3.84rem;
  }
  > div:nth-child(5) {
    height: 4rem;
    margin-top: .34rem;
    box-sizing: border-box;
    > :first-child {
      position: absolute;
      width: 4.066667rem;
      z-index: -1;
    }
    > :last-child {
      margin-top: .333333rem;
      width: 3.653333rem;
    }
  }
  > div:nth-child(6) {
    margin-top: .5rem;
    .tgBtn {
      margin-top: .2rem;
      height: .8rem;
      padding: 0 .8rem;
      background: #3cb6ef;
      font-size: .4rem;
      border-radius: .8rem;
      border: none;
    }
    img {
      margin-top: .3rem;
      width: 4.72rem;
    }
  }
  .wenzi > p{
    line-height: .6rem;
    margin: 0;
  }
}
.tgbg {
  width: 10rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
</style>