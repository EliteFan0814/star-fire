<template>
  <div class="body">
    <div class="main">
      <publicHeader :name="'订单支付'"
        :icon="true" />
      <div class="topTitle">
        <div>选择地址</div>
      </div>
      <div class="addressMsg"
        @click="handleAdress">
        <div class="leftMsg">
          <div>
            <span>{{addressInfo.linkman}}</span>
            <span>{{addressInfo.contact}}</span>
          </div>
          <div>收货地址: {{addressInfo.address}}</div>
        </div>
        <div>
          <van-icon class="icon"
            name="arrow" />
        </div>
      </div>
      <div class="goodsMsg">
        <div v-for="(item, index) in info.list" :key="index">
          <div class="imgDiv">
            <img :src="item.goods_thumb" alt="暂无图片">
          </div>
          <div class="rightMsg">
            <div class="rightTitle">{{item.goods_title}}</div>
            <div class="rightPrice">
              <div>
                单价：{{item.goods_price}}
              </div>
              <div>
                × {{item.goods_num}}
              </div>
            </div>
            <div class="rightPrice">
              <div></div>
              <div>
                <span>￥{{item.xiaoji}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="gongji">运费：
          <span>￥{{info.shipfee}}</span>
        </div>
      </div>
    </div>
    <van-submit-bar :price="info.orderfee*100"
      button-text="支  付"
      @submit="onSubmit" />

  </div>
</template>
<script>
import rsWxApi from '@/WxCode/wxapi'
import publicHeader from '@/components/publicHeader.vue'
export default {
  components: {
    publicHeader
  },
  data() {
    return {
      type: '', //购物车或普通购买
      info: {}, //订单对象
      addressInfo: {}, //地址对象
      item: {} //接收到的对象
    }
  },
  created() {
    this.type = this.$route.query.type;
    this.item = this.$route.query;
    this.getOrderDetails();
  },
  methods: {
    // 获取订单详情
    getOrderDetails() {
      this.$http.post('/member/exchange_order/confirm', this.item).then(res => {
        this.info = res.data;
        this.checkAdd(res);
      }).catch(() =>{})
    },
    checkAdd(res) {
      if(JSON.stringify(this.$store.state.addressItem) == '{}') {        
        this.addressInfo = res.data.address_info;
      } else {
        this.addressInfo = this.$store.state.addressItem;
        this.$store.commit('SAVE_ADDRESS', {});
      }
      if(this.addressInfo == null || this.addressInfo == {}) {
        this.addressInfo = {}
        this.$dialog.confirm({
          title: '提示',
          message: '请先设置默认收货地址'
        }).then(() => {
          this.handleAdress();
        }).catch(() => {
          this.$toast('没有默认收货地址, 无法支付订单')
        })
      }
    },
    // 支付订单
    onSubmit() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认支付该订单'
      }).then(() => {
        // 立即购买
        this.$http.post('/member/goods_order/submit_a', {
          adr_id: this.addressInfo.id,
          ...this.item
        }).then(res => {
          this.$toast('订单支付成功');
          this.$router.push({name: 'Order'})
        }).catch(() => {})
      }).catch(() => {
        this.$toast('取消支付')
      })
    },
    // 跳转地址列表
    handleAdress() {
      this.$router.push({
        name: 'Address',
        query: { chooseAddress: true }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.body {
  background: #f5f5f5;
  min-height: 580px;
  padding-top: 8px;
  box-sizing: border-box;
  font-size: .36rem;
}
.topTitle {
  background: #fff;
  height: .5rem;
  line-height: .533333rem;
  padding: 0.2rem .533333rem;
  text-align: left;
  > div {
    height: .4rem;
    line-height: .5rem;
    border-left: 2px solid #40a3ff;
    padding-left: .3rem;
  }
}
.addressMsg {
  height: 1.8rem;
  background: #fff;
  padding: 0 .533333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f5f5f5;
  > .leftMsg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 1.4rem;
    padding: .2rem 0;
    > img {
      width: .5rem;
      height: .5rem;
      margin-right: .2rem;
    }
    > div {
      &:first-child {
        // display: flex;
        // justify-content: space-between;
        font-size: .36rem;
        margin-bottom: .3rem;
        >span {
          margin-right: .4rem;
        }
      }
      &:last-child {
        font-size: .3rem;
      }
    }
  }
  > :last-child {
    width: 1rem;
    text-align: right;
    .icon {
      font-size: .5rem;
      color: #666;
    }
  }
}
.goodsMsg {
  background: #fff;
  margin: 0.2rem 0;
  padding: .1rem .533333rem;
  align-items: center;
  > div {
    display: flex;
    height: 1.8rem;
    align-items: center;
    width: 8.96rem;
    margin: .3rem 0;
    padding-bottom: .2rem;
    border-bottom: 1px solid #f5f5f5;
    .imgDiv {
      margin-right: .25rem;
      width: 1.8rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: .2rem;
      }
    }
    .rightMsg {
      // background: #666;
      flex: 1;
      display: flex;
      height: 1.8rem;
      justify-content: space-between;
      flex-direction: column;
      .rightTitle {
        height: .5rem;
        line-height: .5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .36rem;
      }
      .rightPrice {
        display: flex;
        justify-content: space-between;
        font-size: .3rem;
        > div {
          span:last-child {
          font-size: .4rem;
            color: #ff0e0e;
          }
        }
      }
    }
  }
  .gongji {
    height: .4rem;
    font-size: .36rem;
    border: none;
    > span {
      font-size: .4rem;
      color: #ff0e0e;
    }
  }
}

.van-button--danger {
  background: #03d13e;
  border: 1px solid #03d13e;
  font-size: .4rem;
}
.van-submit-bar__text {
  text-align: left;
  font-size: .4rem;
}
</style>
