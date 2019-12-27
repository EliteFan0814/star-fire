<template>
  <div class="wrapper_index_tabgoods">
    <van-cell value="查看全部" is-link to="/mall">
      <template slot="title">
        <span style="margin-right: 0.3rem;border-left: 3px solid #40a3ff;"></span>
        <span>精选商品</span>
      </template>
    </van-cell>
    <div class="goodsList">
      <goods
        v-for="(item,index) in goodsList"
        :key="index"
        :item="item"
        @click.native="openPage()"
      ></goods>
    </div>

    <!-- <infinite-loading
      @infinite="getGoods"
      :identifier="infiniteId"
      direction="bottom"
      style="font-size: .3rem;">
      <div slot="spinner"class="whiteBg">读取中...</div>
      <div slot="no-more" class="whiteBg">已加载全部</div>
      <div slot="no-results" class="whiteBg" >
        <p>暂无商品</p>
      </div>
    </infinite-loading>  -->
  </div>
</template>

<script>
  
import goods from "@/components/goods";
export default {
  components: {
     
    goods
  },
  data() {
    return {
      page: 1,
      goodsList: [],
    };
  },
  watch: {
  },
  computed: {},
  mounted() {
  },
  created() { 
    this.getGoods();         
  },
  methods: {
    // 打开页面
    openPage(page, data) {
      
    },
    // 获取商品
    getGoods() {
      this.$http
        .get("/member/index/pushGoods?limit=10")
        .then(res => {
          if (res.data.lists.length) {
            this.goodsList.push(...res.data.lists);
          }
        }).catch(err => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.sctitle {
  background: #999;
  height: 2rem;
}
.goodsList {
  // margin-top: .2rem;
  padding: 0 .533333rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.isActive {
  background: #ee4a4f;
}
</style>
<style>
.van-cell:not(:last-child)::after {
  border: none;
}
.van-cell__value {
  color: #333;
  font-size: .34rem;
}
.van-cell__title {
  text-align: left;
}
</style>