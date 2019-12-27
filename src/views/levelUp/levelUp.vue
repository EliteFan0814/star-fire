<template>
  <div class="warpper">
    <publicHeader name="升级审核"></publicHeader>
    <div>
      <van-tabs v-model="active" color="#40a3ff" title-active-color="#40a3ff">
        <!-- 待审核 -->
        <van-tab title="待审核">
          <div class="shDiv"  v-for="index in 4">
            <div class="shCard">
              <div class="shChild">
                <div>订单号</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>会员账号</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>所属等级</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>已支付（元）</div>
                <div class="shmoney">111</div>
              </div>
              <div class="shChild">
                <div>提交时间</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>支付凭证</div>
                <img class="levelImg" @click="bigImg" src="@/assets/index/logo.png" alt="">
              </div>
              <div style="text-align: right;margin-top:.8rem;">
                <van-button plain color="#03d13e" size="mini" class="shBtn">拒绝</van-button>
                <van-button color="#03d13e" size="mini" class="shBtn">同意</van-button>
              </div>
            </div>
          </div>
        </van-tab>

        <!-- 已审核 -->
        <van-tab title="已审核">
          <div class="shDiv"  v-for="index in 4">
            <div class="shCard">
              <div class="shChild">
                <div>订单号</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>会员账号</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>已支付（元）</div>
                <div class="shmoney">111</div>
              </div>
              <div class="shChild">
                <div>提交时间</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>同意时间</div>
                <div>20111111</div>
              </div>
              <div class="shChild">
                <div>支付凭证</div>
                <img @click="bigImg" src="@/assets/index/logo.png" alt="">
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      
    </div>
    <van-image-preview
      v-model="show"
      :images="images">
    </van-image-preview>
    <tabbar :cardno="cardno"></tabbar>
  </div>
</template>
<script>
import publicHeader from '@/components/publicHeader'
import tabbar from '@/components/tabbar'
export default {
  components: {
    tabbar,
    publicHeader
  },
  data() {
    return {
      cardno: 1,
      active: 0,
      show: false,
      images: [require('@/assets/index/logo.png')]
    }
  },
  methods: {
    bigImg() {
      this.show = true;
    }
  },
}
</script>
<style lang="scss" scoped>
.warpper {
  padding-bottom: 50px;
}
.shmoney {
  color: #ff5f5f;
}
.shDiv {
  padding: .266667rem .533333rem;
  font-size: .4rem;
  .shCard {
    border: 1px solid #f5f5f5;
    padding: .38rem;
    box-shadow: 0 0 10px #f5f5f5;
    border-radius: .213333rem;
    .shChild {
      margin-bottom: .3rem;
      display: flex;
      justify-content: space-between;
      .levelImg {
        width: 1.333333rem;
        height: 1.6rem;
      }
    }
    .shBtn {
      width: 2rem;
      height: .613333rem;
      font-size: .32rem;
      margin-left: .3rem;
    }
  }
}
</style>