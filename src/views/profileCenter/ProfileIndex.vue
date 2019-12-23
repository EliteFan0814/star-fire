<template>
  <div class="profile-body">
    <div class="profile-info">
      <div class="top-bar">
        <van-row>
          <van-col span="8" offset="8"><span>个人中心</span></van-col>
          <van-col span="3" offset="4"><span class="check-in">签到</span></van-col>
        </van-row>
      </div>
      <!-- 个人信息 -->
      <div class="personal-info">
        <van-row>
          <van-col span="22" offset="1">
            <div class="personal-info-wrapper">
              <div class="left-avatar">

                <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
              </div>
              <div class="right-info">
                <div class="right-info-top">
                  <div class="rignt-info-wrapper">
                    <span class="user-name">你你你你你豆子</span>
                    <span class="user-level">
                      <img src="@/assets/personal/v.png" alt="" srcset="">
                      <span class="v-number">0</span>
                      <span class="v-text">普通会员</span>
                    </span>
                  </div>
                  <div class="charge">
                    <span>充值</span>
                    <img src="@/assets/personal/in.png" alt="" srcset="">
                  </div>
                </div>
                <div class="right-info-bottom">
                  <span>邀请码：VFRG45243</span>
                </div>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 余额列表 -->
      <div class="balance-list">
        <van-row>
          <van-col span="6">
            <div class="balance-item">
              <div class="balance-value">1200.00</div>
              <div class="balance-unit">余额（元）</div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="balance-item">
              <div class="balance-value">0.00</div>
              <div class="balance-unit">分润（元）</div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="balance-item">
              <div class="balance-value">0</div>
              <div class="balance-unit">兑换券（张）</div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="balance-item last-item">
              <div class="balance-value">30</div>
              <div class="balance-unit">积分（元）</div>
            </div>
          </van-col>
        </van-row>
      </div>

    </div>
    <!-- 漏单列表 -->
    <div class="lost-order">
      <van-row>
        <van-col span="22" offset="1">
          <div class="lost-wrapper">
            <div class="lost-amount"><span>漏单</span><span class="lost-warn">100</span></div>
            <div class="lost-money"><span>漏单金额：</span><span class="lost-all-money">&yen;1587.00</span></div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 推广广告 -->
    <div class="jump-banner">
      <van-row>
        <van-col span="22" offset="1">
          <img src="@/assets/personal/banner01.png" alt="">
        </van-col>
      </van-row>
    </div>
    <!-- 我的订单 -->
    <div class="my-order">
      <van-row>
        <van-col span="24">
          <div class="order-wrapper">
            <van-cell title="我的订单" is-link value="查看全部订单">
              <img slot="icon" class="order-img" src="@/assets/personal/my-order.png" />
            </van-cell>
          </div>
        </van-col>
        <van-col span="22" offset="1">
          <div class="order-img-list">
            <div class="img-item">
              <img src="@/assets/personal/deliver.png" alt="">
              <span>待发货</span>
            </div>
            <div class="img-item">
              <img src="@/assets/personal/receive.png" alt="">
              <span>待收货</span>
            </div>
            <div class="img-item">
              <img src="@/assets/personal/complete.png" alt="">
              <span>已完成</span>
            </div>
            <div class="img-item">
              <img src="@/assets/personal/failed.png" alt="">
              <span>交易终止</span>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 其他列表 -->
    <div class="other-list">
      <!-- 01 我要推广 -->
      <div class="list-format">
        <van-cell title="我要推广" is-link>

          <img slot="icon" class="other-list-img" src="@/assets/personal/my-promote.png" />
        </van-cell>
      </div>

      <!-- 02 我要提现 -->
      <!-- 02 我的账单 -->
      <!-- 02 收款账户设置 -->
      <div class="list-format">
        <van-cell title="我要提现" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-withdraw.png" />
        </van-cell>
        <van-cell title="我的账单" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-bill.png" />
        </van-cell>
        <van-cell title="收款账户设置" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-collect.png" />
        </van-cell>
      </div>

      <!-- 03 我要升级 -->
      <!-- 03 升级记录 -->
      <div class="list-format">
        <van-cell title="我要升级" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-update.png" />
        </van-cell>
        <van-cell title="升级记录" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-up-record.png" />
        </van-cell>
      </div>

      <!-- 04 我的团队-->
      <div class="list-format my-team">
        <van-cell title="我的团队" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-team.png" />
          <template slot="title">
            <div>
              <span>我的团队</span>
              <span class="my-team-num">123人</span>
            </div>
          </template>
        </van-cell>
      </div>

      <!-- 05 收货地址-->
      <div class="list-format">
        <van-cell title="收货地址" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-address.png" />
        </van-cell>
      </div>

      <!-- 06 联系客服-->
      <!-- 06 平台公告-->
      <div class="list-format">
        <van-cell title="联系客服" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-serve.png" />
        </van-cell>
        <van-cell title="平台公告" is-link>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-announce.png" />
        </van-cell>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.profile-body {
  // background-color: #f5f5f5;
  background-color: #fff;
}
.profile-info {
  // border: 1px solid red;
  // height: 6.666667rem;
  padding-bottom: 0.933333rem;
  background: url(../../assets/personal/personalBg.png);
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: cover;
  background-clip: border-box;
  background-position: center;
  background-origin: border-box;
  // 个人中心
  .top-bar {
    text-align: center;
    padding-top: 0.4rem;
    font-family: PingFang-SC-Bold;
    font-size: 0.48rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.533333rem;
    letter-spacing: 0px;
    color: #ffffff;
    .check-in {
      font-size: 0.4rem;
    }
  }
  // 个人信息
  .personal-info {
    // border: 1px solid red;
    margin-top: 0.866667rem;

    .personal-info-wrapper {
      display: flex;
      align-items: center;
      .left-avatar {
        width: 1.3rem;
        height: 1.3rem;
        border: 0.026667rem solid #fff;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
      .right-info {
        flex-grow: 1;
        // border: 1px solid red;
        margin-left: 0.266667rem;
        font-size: 0.4rem;
        line-height: 0.533333rem;
        color: #ffffff;
        .right-info-top {
          margin-bottom: 0.2rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.4rem;
          line-height: 0.533333rem;
          .rignt-info-wrapper {
            display: flex;
            align-items: center;
            .user-name {
              display: inline-block;
              margin-right: 0.266667rem;
              width: 2.4rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              overflow: hidden;
            }
            .user-level {
              // border: 1px solid yellow;
              padding: 0.03rem 0.226667rem;
              border-radius: 0.24rem;
              background-color: #407aff;
              img {
                width: 0.4rem;
              }
              .v-number {
                font-size: 0.16rem;
              }
              .v-text {
                font-size: 0.293333rem;
                margin-left: 0.133333rem;
              }
            }
          }
          .charge {
            // border: 1px solid red;
            display: flex;
            align-items: center;
            color: #fffb96;
            img {
              margin-left: 0.2rem;
              height: 0.266667rem;
            }
          }
        }
      }
      .right-info-bottom {
        font-size: 0.346667rem;
        line-height: 0.533333rem;
      }
    }
  }
  //  余额列表
  .balance-list {
    margin-top: 0.666667rem;
    font-size: 0.48rem;
    line-height: 0.533333rem;
    letter-spacing: 0.029333rem;
    color: #ffffff;

    .balance-item {
      border-right: 0.013333rem solid #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .balance-value {
        margin-bottom: 0.2rem;
      }
      .balance-unit {
        font-size: 0.32rem;
        letter-spacing: 0.018667rem;
        color: #ffffff;
      }
    }
    .last-item {
      border-right: none;
    }
  }
}
// 漏单列表
.lost-order {
  margin-top: -0.566667rem;
  font-size: 0.426667rem;
  line-height: 0.533333rem;
  color: #333333;
  .lost-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0px 2px 16px 0px rgba(8, 1, 3, 0.07);
    border-radius: 10px;
    padding: 0.466667rem 0.626667rem;
    .lost-amount {
      .lost-warn {
        margin-left: 0.266667rem;
        padding: 0.05rem 0.12rem;
        background-color: #ff5f5f;
        border-radius: 20px;
      }
    }
    .lost-money {
      .lost-all-money {
        color: #ff5f5f;
        font-weight: bolder;
      }
    }
  }
}
//  推广广告
.jump-banner {
  background-color: #fff;
  margin-top: 0.466667rem;
  img {
    width: 100%;
  }
}
//  我的订单
.my-order {
  .order-wrapper {
    // border-bottom: 1px solid red;
    .van-cell:not(:last-child)::after {
      border: none;
    }
  }
  .order-img {
    height: 0.453333rem;
    width: 0.373333rem;
    margin: auto 0;
    margin-right: 0.133333rem;
  }
  .order-img-list {
    border-top: 1px solid #ddd;
    padding-top: 0.426667rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.32rem;
    line-height: 0.533333rem;
    letter-spacing: 0.018667rem;
    color: #999999;
    .img-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 0.626667rem;
        margin-bottom: 0.213333rem;
      }
    }
  }
}
// 其他列表
.other-list {
  border-top: 0.5px solid transparent;
  background-color: #f5f5f5;
  .list-format {
    margin-top: 0.213333rem;
    .other-list-img {
      height: 0.453333rem;
      width: 0.453333rem;
      margin: auto 0;
      margin-right: 0.133333rem;
    }
  }
  .my-team {
    .my-team-num {
      margin-left: 0.266667rem;
      padding: 0.05rem 0.12rem;
      background-color: #40a3ff;
      border-radius: 20px;
    }
  }
}
</style>