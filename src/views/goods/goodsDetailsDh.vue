<template>
<div>
  <div class="goodsBody">
    <!-- <div class="iconGood" @click="goBack">
      <van-icon name="arrow-left"/>
    </div> -->
    <detailHeader name="兑换商品详情"></detailHeader>
    <van-swipe :autoplay="3000"
      indicator-color="white" style="height: 10rem;">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
      <img class="goodsImg" :src="item.pic_arr" alt="加载中">
      </van-swipe-item>
    </van-swipe>
    <div class="goodsMsg">
      <div>
        <span>￥{{item.price}}</span>
        <span>运费：{{item.shipfee}}</span>
      </div>
      <div>{{item.title}}</div>
      <div>
        <div>全场商品包邮免邮费</div>
        <div>
          <div class="jieshao">
            <img src="@/assets/goods/g_zp.png" alt="">
            <div>正品保障</div>
          </div>
          <div class="jieshao">
            <img src="@/assets/goods/g_rz.png" alt="">
            <div>质量保障</div>
          </div>
        </div>
      </div>
    </div>
    <div class="goodsDeatils">
      <div>
        <span></span>
        <span>商品详情</span>
      </div>
      <div v-html="item.content" class="contentStyle"></div>
    </div>
  </div>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="jumpToPage('car')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCar" />
      <van-goods-action-button type="danger" text="立即购买" @click="jumpToPage('confirmOrderDh')" />
    </van-goods-action>
  </div>
</div>
</template>
<script>
import detailHeader from '@/components/detailHeader'
export default {
  components: {
    detailHeader
  },
  data() {
    return {
      id: '',
      item: {},
      bannerList: [],
    }
  },
  created() {
    this.id = this.$route.query.id
    if(this.id) {
      this.getGoodsDetails();
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    jumpToPage(url) {
      this.$router.push(url)
    },
    addCar() {

    },
    getGoodsDetails() {
      this.$http.get('/member/exchange/info?id='+this.id).then(res => {
        this.item = res.data.info;        
        this.bannerList = res.data.pic_arr;
      }).catch(() =>{})
    }
  },
}
</script>
<style lang="scss" scoped>
.goodsBody {
  margin-top: -50px;
  margin-bottom: 50px;
  font-size: .32rem;
  text-align: left;
  .iconGood {
    position: fixed;
    top: .3rem;
    left: .2rem;
    padding: .2rem;
    z-index: 2000;
    font-size: .5rem;
  }
  .contentStyle {
    img: {
      width: 10rem;
    }
  }
  .goodsImg {
    width: 10rem;
    height: 10rem;
  }
  .goodsMsg {
    padding: .266667rem .533333rem;
    > :first-child {
      display: flex;
      align-items: center;
      :first-child {
        color: #f31e1e;
        font-size: .48rem;
      }
      :nth-child(2) {
        padding: 0 .2rem;
        margin: 0 .25rem;
        color: #999;
        font-size: .293333rem;
        border-radius: .1rem;
      }
      :nth-child(3) {
        color: #999;
        font-size: .293333rem;
        margin-left: .2rem;
      }
    }
    > :nth-child(2) {
      margin-top: .1rem;
      font-size: .426667rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    > :nth-child(3) {
      margin-top: .3rem;
      display: flex;
      justify-content: space-between;
      > :first-child {
        color: #ff6b6e;
      }
      > :nth-child(2) {
        display: flex;
        align-items: center;
        color: #ff8540;
        font-size: .266667rem;
        img {
          width: .32rem;
          height: .32rem;
          margin: 0 .1rem 0 .4rem;
        }
        .jieshao {
          display: flex;
          align-items: center;
          > div {
            height: .4rem;
            line-height: .45rem;
          }
        }
      }
    }
  }
  .goodsDeatils {
    padding: .266667rem .533333rem;
    border-top: 8px solid #f5f5f5;
    > :first-child {
      font-size: .346667rem;
      padding-bottom: .2rem;
      border-bottom: 1px solid #f5f5f5;
      > :first-child {
        height: .3rem;;
        border: 1px solid #ff8540;
        margin-right: .2rem;
      }
    }
  }
}
</style>