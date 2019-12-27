<template>
  <div class="body">
    <div class="main">
      <publicHeader :name="'兑换订单'"
        :icon="true" />
      <div class="topTitle">
        <div>选择地址</div>
      </div>
      <div class="addressMsg"
        @click="handleAdress">
        <div class="leftMsg">
          <img src="@/assets/index/logo.png" alt="">
          <div>
            <div>{{rowCon.contact}} {{rowCon.phone}}</div>
            <div>收货地址: {{rowCon.address}}</div>
          </div>
        </div>
        <div>
          <van-icon class="icon"
            name="arrow" />
        </div>
      </div>
      <div class="goodsMsg">
        <div>
          <div>
            <img :src="info.thumb || require('@/assets/index/logo.png')"
              alt="">
          </div>
          <div class="rightMsg">
            <div class="rightTitle">{{info.name}}</div>
            <div class="rightPrice">
              <div>
                <span>单价：</span>
                <span>￥{{info.retailPrice}}</span>
              </div>
              <div>
                <van-stepper v-model="GoodsCount"
                  button-size="16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar :price="info.retailPrice*GoodsCount*100"
      button-text="提交订单"
      @submit="onSubmit" />

  </div>
</template>
<script>
import rsWxApi from '@/WxCode/wxapi'
import publicHeader from '@/components/publicHeader.vue'
import { getCookie } from '@/utils/cookie'
export default {
  components: {
    publicHeader
  },
  data() {
    return {
      orderId: '',
      info: {},
      rowCon: {},
      GoodsCount: 1,
      AddressId: '',
    }
  },
  methods: {
    onSubmit() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认支付?'
      }).then(() => {
        this.$toast('支付')
      }).catch(() => {
        this.$toast('取消支付')
      })
    },

    handleAdress() {
      this.$router.push({
        name: 'addressRun',
        query: { chooseAddress: true }
      })
    },
    getAddress() {
      this.$http
        .post('/api/MemberAddress/LoadDefualt')
        .then(res => {
          this.rowCon = res.value
        })
        .catch(err => {})
    },
  },
  created() {},
  mounted() {
  }
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
    display: flex;
    height: 1.8rem;
    align-items: center;
    padding: .2rem 0;
    > img {
      width: .5rem;
      height: .5rem;
      margin-right: .2rem;
    }
    > div {
      :first-child {
        font-size: .32rem;
        margin-bottom: .2rem;
      }
      :last-child {
        font-size: .36rem;
      }
    }
  }
  > :last-child {
    .icon {
      font-size: .5rem;
      color: #666;
    }
  }
}
.goodsMsg {
  background: #fff;
  margin: 0.2rem 0;
  padding: .3rem .533333rem;
  align-items: center;
  > :first-child {
    display: flex;
    height: 2rem;
    align-items: center;
    img {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: .2rem;
      margin-right: .2rem;
    }
    .rightMsg {
      display: flex;
      height: 1.5rem;
      flex: 1;
      justify-content: space-between;
      flex-direction: column;
      .rightTitle {
        height: .6rem;
        line-height: .6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .24rem;
      }
      .rightPrice {
        display: flex;
        justify-content: space-between;
        > div {
          color: #ff0e0e;

          span:last-child {
            font-size: .3rem;
          }
        }
      }
    }
  }
}

.van-button--danger {
  background: #03d13e;
  border: 1px solid #03d13e;
}
.van-submit-bar__text {
  text-align: left;
  // margin-left: .533333rem;
}
</style>
