<template>
<div class="mall">
  <publicHeader :icon="true" :name="name"></publicHeader>
  <div class="goodsList">
    <goods
      v-for="(item,index) in goodsList"
      :key="index"
      :item="item"
      @click.native="openPage()"
    ></goods>
  </div>
  <infinite-loading
    @infinite="getGoods"
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
      name: '',
      page: 1,
      goodsList: [],
      infiniteId: +new Date(),
      goodsShow: true,
    }
  },
  mounted() {
    this.name = this.$route.query.name || ''
  },
  methods: {
    // 获取商品
    getGoods($state) {
      this.$http.get("/member/goods/lists", {
        params: {
          page: this.page,
          rows: 10,
          keywords: this.name
        }
      }).then(res => {
        
        if (res.data.list.length) {
          this.page += 1;   
          this.goodsList.push(...res.data.list);
          if(res.data.list.length<10){
            $state.complete();
          }
          else{
            $state.loaded();
          }
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
  padding: 0 .533333rem;
  padding-top: .3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.whiteBg {
  height: .5rem;
}
</style>