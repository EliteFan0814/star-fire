<template>
  <div class="my-order">
    <div class="top-nav">
      <div class="top-slogin">
        <van-row>
          <van-col span="1" offset="1"><img class="out-img" src="@/assets/personal/out.png" alt="" srcset=""></van-col>
          <van-col span="8" offset="6"><span class="check-in">我的订单</span></van-col>
        </van-row>
      </div>
      <div class="top-btn-list">
        <van-row>
          <van-col span="6" offset="6"><span class="top-btn-active">商城订单</span></van-col>
          <van-col span="6"><span>兑换订单</span></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.my-order {
  font-family: PingFang-SC-Bold;
  .top-nav {
    padding: 0.466667rem;
    text-align: center;
    background-color: #40a3ff;
    font-size: 0.48rem;
    line-height: 0.533333rem;
    color: #ffffff;
    .top-slogin {
      margin-bottom: 0.36rem;
      .out-img {
        width: 0.213333rem;
        height: 0.4rem;
      }
    }
    .top-btn-list {
      font-size: .4rem;
      line-height: .613333rem;
      .top-btn-active {
        padding: 0.05rem 0.12rem;
        background-color: #fff;
        border-radius: .266667rem;
        color: #40a3ff;
      }
    }
  }
}
</style>