<template>
  <div class="profile-body">
    <div class="profile-info">
      <div class="top-bar">
        <van-row>
          <van-col span="8" offset="8"><span>个人中心</span></van-col>
          <van-col span="3" offset="4" @click="checkIn"><span class="check-in">签到</span></van-col>
        </van-row>
      </div>
      <!-- 个人信息 -->
      <div class="personal-info">
        <van-row>
          <van-col span="22" offset="1">
            <div class="personal-info-wrapper">
              <div class="left-avatar" @click="toNextPage('ProfileInfo')">
                <img v-if="info.thumb" :src="info.thumb" alt="avatar">
                <img v-else src="@/assets/index/logo.png" alt="avatar">
              </div>
              <div class="right-info">
                <div class="right-info-top">
                  <div class="rignt-info-wrapper" @click="toNextPage('ProfileInfo')">
                    <span class="user-name">{{info.nickname || info.account}}</span>
                    <span class="user-level">
                      <img src="@/assets/personal/v.png" alt="" srcset="">
                      <span class="v-number">{{info.level}}</span>
                      <span class="v-text">{{info.level_str}}</span>
                    </span>
                  </div>
                  <div class="charge" @click="toNextPage('Charge')">
                    <span>充值</span>
                    <img src="@/assets/personal/in.png" alt="" srcset="">
                  </div>
                </div>
                <div class="right-info-bottom" @click="toNextPage('ProfileInfo')">
                  <span>邀请码：{{info.spread_code}}</span>
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
            <div class="balance-item" @click="toNextPage('Bill','point','积分')">
              <div class="balance-value">{{info.point}}</div>
              <div class="balance-unit">积分</div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="balance-item" @click="toNextPage('Bill','reward','佣金')">
              <div class="balance-value">{{info.bill_fh}}</div>
              <div class="balance-unit">佣金</div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="balance-item" @click="toNextPage('Bill','amount','余额')">
              <div class="balance-value">{{info.amount}}</div>
              <div class="balance-unit">余额（元）</div>
            </div>
          </van-col>
          <van-col span="6">
            <div class="balance-item last-item" @click="toNextPage('Bill','reward','佣金','fy','返佣')">
              <div class="balance-value">{{info.reward}}</div>
              <div class="balance-unit">推广总收益</div>
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
            <div class="lost-amount"><span>漏单</span><span class="lost-warn">{{info.slip_num}}</span></div>
            <div class="lost-money"><span>漏单金额：</span><span class="lost-all-money">&yen; {{info.slip_money}}</span></div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 推广广告 -->
    <div class="jump-banner">
      <van-row>
        <van-col span="22" offset="1" @click="toNextPage('Upgrade')">
          <img src="@/assets/personal/banner01.png" alt="">
        </van-col>
      </van-row>
    </div>
    <!-- 我的订单 -->
    <div class="my-order">
      <van-row>
        <van-col span="24">
          <div class="order-wrapper">
            <van-cell title="我的订单" is-link value="查看全部订单" @click="toNextPage('Order')">
              <img slot="icon" class="order-img" src="@/assets/personal/my-order.png" />
            </van-cell>
          </div>
        </van-col>
        <van-col span="22" offset="1">
          <div class="order-img-list">
            <div class="img-item" @click="toNextPage('Order',1)">
              <img src="@/assets/personal/deliver.png" alt="">
              <span>待发货</span>
            </div>
            <div class="img-item" @click="toNextPage('Order',2)">
              <img src="@/assets/personal/receive.png" alt="">
              <span>待收货</span>
            </div>
            <div class="img-item" @click="toNextPage('Order',3)">
              <img src="@/assets/personal/complete.png" alt="">
              <span>已完结</span>
            </div>
            <!-- <div class="img-item" @click="toNextPage('Order')">
              <img src="@/assets/personal/failed.png" alt="">
              <span>交易终止</span>
            </div> -->
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 其他列表 -->
    <div class="other-list">
      <!-- 01 我要推广 -->
      <div class="list-format">
        <van-cell title="我要推广" is-link @click="toNextPage('Promote')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-promote.png" />
        </van-cell>
      </div>

      <!-- 04 我的团队-->
      <div class="list-format my-team">
        <van-cell title="我的团队" is-link @click="toNextPage('Team')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-team.png" />
          <template slot="title">
            <div>
              <span>我的团队</span>
              <span class="my-team-num">{{info.team_num}} 人</span>
            </div>
          </template>
        </van-cell>
      </div>
      <!-- 02 我要提现 -->
      <!-- 02 我的账单 -->
      <!-- 02 收款账户设置 -->
      <div class="list-format">
        <!-- <van-cell title="我的分润" is-link @click="toNextPage('SliceMoney')"> -->
        <van-cell title="我的分润" is-link @click="toNextPage('Bill','reward','分润','fy')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-splice.png" />
        </van-cell>
        <van-cell title="我要提现" is-link @click="toNextPage('Withdraw')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-withdraw.png" />
        </van-cell>
        <van-cell title="我的账单" is-link @click="toNextPage('Bill')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-bill.png" />
        </van-cell>
        <van-cell title="收款账户设置" is-link @click="toNextPage('Settings')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-collect.png" />
        </van-cell>
      </div>

      <!-- 03 我要升级 -->
      <!-- 03 升级记录 -->
      <div class="list-format">
        <van-cell title="我的兑换券" is-link @click="toNextPage('ExchangeCard')">
          <span class="exchange-num" slot="default">{{info.exchange_num}} 张</span>
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-exchange.png" />
        </van-cell>
        <van-cell title="我要升级" is-link @click="toNextPage('Upgrade')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-update.png" />
        </van-cell>
        <van-cell title="升级记录" is-link @click="toNextPage('UpgradeOrderRecord')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-up-record.png" />
        </van-cell>
        <!-- <van-cell title="升级订单" is-link @click="toNextPage('UpgradeOrder')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-up-record.png" />
        </van-cell> -->
      </div>

      <!-- 05 收货地址-->
      <div class="list-format">
        <van-cell title="收货地址" is-link @click="toNextPage('Address')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-address.png" />
        </van-cell>
      </div>

      <!-- 06 联系客服-->
      <!-- 06 平台公告-->
      <div class="list-format">
        <van-cell title="联系客服" is-link @click="toNextPage('Service')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-serve.png" />
        </van-cell>
        <van-cell title="平台公告" is-link @click="toNextPage('notice')">
          <img slot="icon" class="other-list-img" src="@/assets/personal/my-announce.png" />
        </van-cell>
      </div>
    </div>
    <div class="up-btn">
      <van-button type="primary" size="large" @click="logOut">退出登录</van-button>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import tabbar from '@/components/tabbar'
export default {
  components: {
    tabbar
  },
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    ...mapMutations(['LOG_OUT']),
    // 获取个人信息
    getProfile() {
      this.$http.get('/member/member/info').then(res => {
        this.info = res.data.info
      })
    },
    checkIn() {
      this.$http
        .post('/member/sign/record')
        .then(res => {})
        .catch(err => {
          console.log(err)
        })
    },
    toNextPage(routerName, accountClass, accountText, classClass, classText) {
      this.$router.push({
        name: routerName,
        query: { accountClass, accountText, classClass, classText }
      })
    },
    logOut() {
      this.$dialog
        .confirm({ title: '退出登录', message: '退出当前账户' })
        .then(() => {
          this.LOG_OUT()
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-body {
  // background-color: #f5f5f5;
  background-color: #fff;
  margin-top: -50px;
  margin-bottom: 60px;

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
                margin-right: 0.166667rem;
                max-width: 2.6rem;
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
          font-size: 0.32rem;
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
      .exchange-num {
        color: #ff5f5f;
      }
    }
    .my-team {
      .my-team-num {
        margin-left: 0.266667rem;
        padding: 0.05rem 0.12rem;
        background-color: #40a3ff;
        border-radius: 20px;
        color: #fff;
      }
    }
  }

  .up-btn {
    display: flex;
    justify-content: center;
    margin-top: 0.213333rem;
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