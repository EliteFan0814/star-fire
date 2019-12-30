<template>
<div class="mall">
  <publicHeader :icon="true" name="购物商城"></publicHeader>
  <van-tabs v-model="active" sticky color="#40a3ff" title-active-color="#40a3ff">
    <van-tab :title="item.name" :name="item.cate_id" v-for="item in fenlei" :key="item.cate_id"></van-tab>
  </van-tabs>
  <div class="goodsList">
    <goods
      v-for="(item,index)  in goodsList"
      :key="index"
      :item="item"
      @click.native="openPage()"
    ></goods>
  </div>
  <infinite-loading
    :distance="distance"
    @infinite="getGoods"
    :identifier="infiniteId">
    <div slot="spinner" class="whiteBg">读取中...</div>
    <div slot="no-more" class="whiteBg">已加载全部</div>
    <div slot="no-results" class="whiteBg" >
      <img src="@/assets/index/none.png" width="100" style="margin-top: 20px" alt="">
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
      active: '',
      goodsList: [],
      infiniteId: +new Date(),
      fenlei: [],
      distance: 100,
      page: 1,
    }
  },
  watch: {
    active() {
      this.page = 1;
      this.goodsList = [];
      this.infiniteId += 1;
    }
  },
  created() {
    this.getFenlei();
  },
  methods: {
    getFenlei() {
      this.$http.get('/member/index/cate').then(res => {
        this.fenlei = res.data.list;
        this.fenlei.unshift({name: '全部', cate_id: ''})
      }).catch(() =>{})
    },
    // 获取商品
    getGoods($state) {
      this.$http.get("/member/goods/lists", {
        params: {
          page: this.page,
          rows: 10,
          cate_id: this.active
        }
      }).then(res => {
        if (res.data.list.length) {
          this.page += 1;          
          this.goodsList.push(...res.data.list);
          $state.loaded();
        } else {
          $state.complete();
        }
      }).catch(err => {});
    },
  },
}
</script>
<style lang="scss" scoped>
.goodsList {
  border-top: 8px solid #f5f5f5;
  padding: 0 .533333rem;
  padding-top: .3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.whiteBg {
  color: #999;
  font-size: 0.28rem;
}
</style>