<template>
  <div class="warpper">
    <search></search>
    <!-- <van-pull-refresh v-model="isLoading"
      @refresh="onRefresh"> -->
      <!-- 轮播 -->
      <theBanner :bannerList="bannerList"></theBanner>
      <!-- 公告 -->
      <nitoceBanner :theArticleList="theArticleList"></nitoceBanner>
      <!-- 功能区 -->
      <features></features>
      <!-- 商品列表 -->
      <tabGoods ref="tabGoods"></tabGoods>
    <!-- </van-pull-refresh> -->
    <tabbar :cardno="cardno"></tabbar>
  </div>
</template>
<script>
import search from './components/search';
import theBanner from './components/theBanner';
import nitoceBanner from './components/nitoceBanner';
import features from './components/features'
import tabGoods from './components/tabGoods'
import tabbar from '@/components/tabbar'
export default {
  components: {
    search,
    theBanner,
    features,
    nitoceBanner,
    tabGoods,
    tabbar
  },
  data() {
    return {
      isLoading: false,
      bannerList: [],
      theArticleList: [],

      page: 1,
      cardno: 0,
    }
  },
  mounted() {
    this.getBannerList();
    this.getArticleList();
  },
  methods: {
    getBannerList() {
      this.$http.get('/member/index/banner?limit=3').then(res => {
        this.bannerList = res.data.list;
      }).catch(() =>{})
    },
    getArticleList() {
      this.$http.get('/member/article/lists', {
        params: {
          rows: 10,
          page: this.page,
          cate: 2
        }
      }).then(res => {
        this.theArticleList = res.data.list;
      }).catch(() =>{})
    }
  },
}
</script>
<style lang="scss" scoped>
.warpper {
  min-height: 580px;
  padding-bottom: 50px;
}
</style>