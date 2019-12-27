<template>
<div class="mall">
  <publicHeader :icon="true" name="兑换专区"></publicHeader>
  <div class="mallTop" :style="{display: yincang}">
    <div>注意：兑换专区商品不包邮，需自行支付邮费</div>
    <div @click="divYincang"><van-icon name="cross" style="font-size: .4rem;"/></div>
    </div>
  <div class="goodsList" >
    <div class="goods" @click="jumpPage('goodsDetailsDh',item.id)" v-for="(item,index) in goodsList" :key="item.id">
      <div>
        <img :src="item.picurl || require('@/assets/index/1.png')"
          @error="item.picurl = require('@/assets/index/1.png')" alt="">
      </div>
      <div>
        <div class="name">
          {{item.title}}
        </div>
        <div class="price">
          <div>
            {{(item.exchange_level_str || 0) +'兑换券'}}
          </div>
          <div class="stepNum" v-if="item.is_point == 1 && item.exchange_level">
            {{ '(或积分 '+item.price+')'}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <infinite-loading
      @infinite="getGoods"
      v-if="goodsShow"
      :identifier="infiniteId"
      direction="bottom"
      style="font-size: .3rem;">
      <div slot="spinner"class="whiteBg">读取中...</div>
      <div slot="no-more" class="whiteBg">已加载全部</div>
      <div slot="no-results" class="whiteBg" >
        <p>暂无商品</p>
      </div>
    </infinite-loading>
</div>
</template>
<script>
import publicHeader from '@/components/publicHeader'
import goods from "@/components/goods";
export default {
  components: {
    publicHeader,
    goods
  },
  data() {
    return {
      active: 0,
      item: {},
      yincang: '',
      goodsList: [],
      goodsShow: true,
      infiniteId: +new Date(),
      fenlei: [],

      page: 1,
    }
  },
  methods: {
    divYincang() {
      this.yincang = 'none';
    },
    jumpPage(url,id) {
      this.$router.push({
        name: url,
        query: {id: id}
      })
    },
    // 获取商品
    getGoods($state) {
      this.$http.get("/member/exchange/lists", {
        params: {
          page: this.page,
          rows: 10,
        }
      }).then(res => {
        if (res.data.list.length) {
          this.page += 1;          
          this.goodsList.push(...res.data.list);
          if(res.data.list.length<10){
            this.goodsShow = false;
            $state.complete();
          }
          else{
            $state.loaded();
            this.goodsShow =true;
          }
        } else {
          $state.complete();
          this.goodsShow = false;
        }
      }).catch(err => {});
    },
  },
}
</script>
<style lang="scss" scoped>
.mallTop {
  background: #fff;
  position: fixed;
  height: .8rem;
  color: #ff5f5f;
  display: flex;
  justify-content: space-between;
  padding: .2rem .533333rem;
  font-size: .32rem;
  width: 100%;
  box-sizing: border-box;
  z-index: 2000;
}
.goodsList {
  padding: 0 .533333rem;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.goods {
  overflow: hidden;
  width: 4.35rem;
  border: 0.5px solid #f5f5f5;
  border-radius: .2rem;
  margin-bottom: 0.4rem;
  padding-bottom: .1rem;
  box-sizing: border-box;
  > div {
    &:first-child {
      // border: 1px solid #999;
      // border-bottom: 0;
      height: 4.4rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:last-child {
      padding: .2rem;
      .name {
        height: 1rem;
        line-height: .5rem;
        font-size: .346667rem;
        text-align: left;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: .2rem;
      }
      .price {
        display: flex;
        justify-content: space-between;
        color: #ee4a4f;
        font-size: .32rem;
        line-height: .5rem;
        .stepNum {
          color: #999999;
          font-size: .266667rem;
        }
      }
      .priceB {
        color: #999999;
        font-size: .266667rem;
      }
    }
  }
}
</style>