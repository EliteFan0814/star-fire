<template>
  <div class="body">
    <publicHeader :name="'订单详情'"
      :icon="true" />
    <div class="top">
      <img class="topBg" src="@/assets/goods/orderBg.png" alt="">
      <p class="text">{{data.status_str}}</p>
    </div>
    <div class="order-info">
      <div class="order-info-title">
        <span></span>
        <span>邮寄地址</span>
      </div>

      <div class="order-address">
        <div class="img"><img src="@/assets/goods/orderAddress.png" alt=""></div>
        <div class="con">
          <p>{{data.linkman}} <span style="margin-left: .3rem;">{{data.express_number}}</span></p>
          <p>{{data.address}}</p>
        </div>
      </div>

      <div class="item-mid" v-for="(item,index) in order" :key="index">
        <div class="item-mid-img">
          <img :src="item.picurl"
            alt="">
        </div>
        <div class="itemMsg">
          <div class="item-mid-info">{{item.name}}</div>
          <div class="item-mid-num" >
            <div>单价：<span>￥{{item.final_price}}</span></div>
            <div>数量：{{item.buy_nums}}</div>
          </div>
        </div>
      </div>
      <div class="order-send">
        总价：
        <span>￥{{data.orderfee}}</span>
        
      </div>
      <div class="order-info-title">
        <span></span>
        <span>订单信息</span>
      </div>
      <!-- 寄售 -->
      <div class="orderParent">
        <div class="order-item"> <span>订单编号</span> <span>{{data.order_sn}}</span></div>
        <div class="order-item"> <span>创建时间</span> <span>{{data.create_time}}</span></div>
        <div class="order-item"> <span>更新时间</span> <span>{{data.update_time}}</span></div>
        
        <div class="order-item" v-if="data.status >= 2"> <span>物流公司</span> <span>{{data.express}}</span></div>
        <div class="order-item" v-if="data.status >= 2"> <span>快递单号</span> <span>{{data.express_number}}</span></div>
      </div>
      

      <div class="item-bot-btnCon">
        <van-button round
          color="#40a3ff"
          type="info"
          size="small"
          v-if="data.status == 1"
          @click="handleCancle">取消订单</van-button>
        <van-button round
          color="#40a3ff"
          type="info"
          size="small"
          v-if="data.status == 2"
          @click="handleSure">确认收货</van-button>
      </div>
    </div>

  </div>
</template>
<script>
import publicHeader from '@/components/publicHeader.vue'
export default {
  components: {
    publicHeader
  },
  data() {
    return {
      query: {}, //传入的对象
      data: {}, //订单信息
      order: {} //商品信息
    }
  },
  methods: {
    // 取消订单
    handleCancle() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要取消订单吗?'
      }).then(() => {
        this.$http.post('/member/goods_order/cancel', {
            order_id: this.query.order_id
          }).then(res => {
            this.$toast(res.msg);
            setTimeout(() => {
              this.$router.go(-1);
            },2000)
          }).catch(() => {})
      }).catch(() => {})
    },
    // 确认收货
    handleSure() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要确认收货吗?'
      }).then(() => {
        this.$http.post('/member/goods_order/receive', {
            order_id: this.query.order_id
          }).then(res => {
            this.getData();
            setTimeout(() => {
              this.$toast('已确认收货');
            })
          }).catch(() => {})
      }).catch(() => {})
    },
    getData() {
      this.$http.get('/member/goods_order/info', {
        params: {
          order_id: this.query.order_id
        }
      }).then(res => {
        this.data = res.data.info;
        this.order =res.data.order_item;
      }).catch(err => {})
    }
  },
  mounted() {
    this.query = this.$route.query
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.body {
  color: #515151;
  font-size: .36rem;
}
.top {
  position: relative;
  border-top: 1px solid rgba(58, 171, 247, 0.562);
  .topBg {
    height: 2.4rem;
    width: 100%;
  }
  .text {
    position: absolute;
    color: #fff;
    left: .6rem;
    top: .4rem;
    font-size: .5rem;
  }
}

.order-info {
  width: 94%;
  margin: 0 3%;
  .order-info-title {
    padding-top: .2rem;
    > span:first-child {
      width: .3rem;
      height: 0.15rem;
      border: 1px solid #40a3ff;
    }
    > span:last-child {
      font-weight: 600;
      font-size: .36rem;
      margin-left: .2rem;
    }
    .order-info-order {
      display: flex;
    }
  }
  .order-address {
    display: flex;
    align-items: center;
    height: 1.6rem;
    border-bottom: 1px solid #f5f5f5;
    margin: .3rem 0;
    .img {
      width: 1.2rem;
      text-align: center;
      > img {
        width: .6rem;
        height: auto;
        margin-right: .2rem;
      }
    }
    .con {
      flex: 1;
      > :last-child {
        font-size: .3rem;
      }
    }
  }
  .order-send {
    height: 1rem;
    line-height: 1rem;
    text-align: right;
    border-bottom: 1px solid #f5f5f5;
    > span {
      font-size: .4rem;
      color: red;
    }
  }
  .orderParent {
    margin-top: .2rem;
    .order-item {
      display: flex;
      width: 92%;
      margin: 0 4%;
      line-height: .7rem;
      justify-content: space-between;
      font-size: .32rem;
      > span:nth-child(2) {
        color: #999;
      }
    }
  }
  .last {
    padding-bottom: .25rem;
    border-bottom: 1px solid #f5f5f5;
  }
}

// 复制商品样式
.item-mid {
  background: #f5f5f5;
  height: 1.6rem;
  display: flex;
  padding: 0.3rem;
  .item-mid-img {
    img {
      height: 1.6rem;
      width: 1.6rem;
      margin-right: .3rem;
      border-radius: 5px;
    }
  }
  .itemMsg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item-mid-info {
      :first-child {
        text-overflow: ellipsis;
      }
    }
    .item-mid-num {
      display: flex;
      justify-content: space-between;
      font-size: .3rem;
      > :last-child {
        color: #acacac;
        text-align: right;
      }
      span {
        font-size: .4rem;
        color: red;
      }
    }
  }
  
}
//复制btn
.item-bot-btnCon {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.45rem;
  .van-button {
    margin: 0 0.1rem;
    width: 2rem;
    font-size: .32rem;
  }
}

.van-popup {
  padding: .2rem .3rem;
  h3,
  p {
    font-size: .28rem;
  }
}
.expStyle {
  line-height: .8rem;
  font-size: .32rem;
  text-align: center;
  color: #666;
}
</style>
