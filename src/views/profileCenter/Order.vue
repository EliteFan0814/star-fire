<template>
  <div class="my-order">
    <publicHeader :icon="true" name="我的订单" jump="ProfileIndex"></publicHeader>
    <div class="top-nav">
      <div class="top-btn-list">
        <van-row>
          <van-col span="6" offset="6"><span :class="{'top-btn-active':mallActive}" @click="changeOrder('mall')">商城订单</span></van-col>
          <van-col span="6"><span :class="{'top-btn-active':!mallActive}" @click="changeOrder('exchange')">兑换订单</span></van-col>
        </van-row>
      </div>
    </div>
    <div class="slide-list">
      <van-tabs v-model="activeTab" animated line-height=".026667rem" color="#40a3ff" title-inactive-color="#cccccc" title-active-color="#40a3ff">
        <van-tab v-for="item in slideList" :name="item.value" :key="item.value" :title="item.label">
          <!-- 循环的订单 -->
          <div class="order-item-wrapper" v-for="(item,index) in orderList" :key="index">
            <van-row>
              <van-col span="22" offset="1">
                <div class="order-item" v-for="goods in item.goods_order_item">
                  <img class="left-img" :src="goods.picurl" alt="">
                  <div class="right-detail" @click="jumpToPage('orderDetails', item.order_id)">
                    <p class="good-feature">{{goods.name}}</p>
                    <span class="trade-status">{{item.status_str}}</span>
                    <div class="price-num">
                      <span class="good-price">价格：￥{{goods.final_price}}</span>
                      <span class="good-num">数量：{{goods.buy_nums}}</span>
                    </div>
                  </div>
                </div>
                <div class="all-money">
                  <div class="left-total">合计：<span>￥{{item.orderfee}}</span></div>
                  <div class="right-btn">
                    <van-button 
                    type="info" 
                    size="small" 
                    v-if="item.status == 1"
                    @click="quxiao(item.order_id)">
                      取消订单
                    </van-button>
                    <van-button 
                    type="info" 
                    size="small" 
                    v-if="item.status == 2"
                    @click="jumpToPage('orderDetails', item.order_id)">
                      查看物流
                    </van-button>
                    <van-button 
                    type="primary" 
                    v-if="item.status == 2"
                    size="small" 
                    @click="shouhuo(item.order_id)">
                      确认收货
                    </van-button>
                  </div>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <infinite-loading :distance="distance" :identifier="infiniteId" @infinite="infiniteHandler">
      <div class="infinite-toast" slot="spinner">小弟拼命加载中...</div>
      <div class="infinite-toast" slot="no-more">已加载完毕</div>
      <div class="infinite-toast" slot="no-results">
        <img src="@/assets/index/none.png" width="100" style="margin-top: 20px" alt="">
        <p>暂无数据</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import publicHeader from '@/components/publicHeader'

export default {
  components: {
    InfiniteLoading,
    publicHeader
  },
  data() {
    return {
      mallActive: true,
      isExchangeOrder: false,
      activeTab: '',
      distance: 100,
      infiniteId: +new Date(),
      upData: {
        page: 1,
        rows: 10,
        state: ''
      },
      orderList: [],
      slideList: []
    }
  },
  watch: {
    activeTab() {
      this.upData.page = 1
      this.upData.state = this.activeTab
      this.orderList = []
      this.infiniteId++
    }
  },
  created() {
    // this.getOrderList()
    if (this.$route.query.queryClass) {
      this.activeTab = this.$route.query.queryClass
    }
  },
  methods: {
    changeOrder(value) {
      this.activeTab = ''
      if (value === 'mall') {
        this.mallActive = true
        this.isExchangeOrder = false
      } else {
        this.mallActive = false
        this.isExchangeOrder = true
      }
      this.upData.page = 1
      this.orderList = []
      this.infiniteId++
    },
    infiniteHandler($state) {
      let orderUrl = '/member/goods_order/lists'
      if (this.isExchangeOrder) {
        orderUrl = '/member/exchange_order/lists'
      }
      this.$http.get(orderUrl, { params: { ...this.upData } }).then(res => {
        this.slideList = this.filterClass(res.data.state_screen, '全部')
        if (res.data.list.length) {
          // 异步更新数据
          this.orderList.push(...res.data.list)
          // 数据全部加载完成
          this.upData.page++
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    filterClass(inData, className) {
      let res = [{ label: className, value: '' }]
      res.push(...inData)
      return res
    },
    // 取消订单
    quxiao(order_id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要取消订单吗 ?'
      }).then(res => {
        this.$http.post('/member/goods_order/cancel',{
          order_id: order_id
        }).then(res => {
          this.upData.page = 1
          this.orderList = []
          this.infiniteId++
          setTimeout(()=> {
            this.$toast('订单已取消');
          },500)
        }).catch(() => {})
      }).catch(() => {})
    },
    // 确认收货
    shouhuo(order_id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要确认收货吗 ?'
      }).then(res => {
        this.$http.post('/member/goods_order/receive',{
          order_id: order_id
        }).then(res => {
          this.upData.page = 1
          this.orderList = []
          this.infiniteId++
          setTimeout(()=> {
            this.$toast('已确认收货');
          },500)
        }).catch(() => {})
      }).catch(() => {})
    },
    jumpToPage(url,order_id) {
      this.$router.push({
        name: url,
        query: {order_id: order_id}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-order {
  min-height: 100vh;
  font-family: PingFang-SC-Bold;
  background-color: #f8f8f8;
  .top-nav {
    // border-top: 1px solid rgb(94, 188, 252);
    padding: 0.333333rem 0;
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
      .check-in-right {
        font-size: 0.4rem;
        line-height: 0.533333rem;
        color: #ffffff;
      }
    }
    .top-btn-list {
      font-size: 0.4rem;
      line-height: 0.613333rem;
      .top-btn-active {
        padding: 0.1rem 0.4rem;
        background-color: #fff;
        border-radius: 0.266667rem;
        color: #40a3ff;
      }
    }
  }
  .slide-list {
    .order-item-wrapper {
      margin: 8px 0;
      .order-item {
        border-bottom: 1px solid #f5f5f5;
        padding: 0.533333rem 0.4rem;
        background-color: #fff;
        display: flex;
        align-items: center;
        .left-img {
          width: 2.133333rem;
          height: 2.133333rem;
          border-radius: 0.133333rem;
        }
        .right-detail {
          flex-grow: 1;
          margin-left: 0.4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .good-feature {
            margin: 0;
            font-size: 0.4rem;
            line-height: 0.533333rem;
            letter-spacing: 0rem;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .trade-status {
            margin: 0.133333rem 0;
            font-size: 0.32rem;
            line-height: 0.613333rem;
            color: #ff5f5f;
          }
          .price-num {
            font-size: 0.32rem;
            line-height: 0.465333rem;
            color: #333333;
            display: flex;
            justify-content: space-between;
          }
        }
      }
      .all-money {
        padding: 0.466667rem 0.4rem;
        border-top: 0.013333rem solid #f5f5f5;
        background-color: #fff;
        font-size: 0.32rem;
        line-height: 0.613333rem;
        color: #333333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-total {
          span {
            font-size: 0.4rem;
            color: #ff5f5f;
          }
        }
        .right-btn {
          .van-button {
            &:first-child {
              margin-right: 0.466667rem;
            }
          }
        }
      }
    }
  }
  .infinite-toast {
    background: #f8f8f8;
    padding: 0.266667rem 0;
    font-size: 0.28rem;
    color: #999;
  }
}
</style>