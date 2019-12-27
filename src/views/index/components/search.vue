<template>
  <div class="wrapper_index_hrader">
    <div class="searchBox">
      <van-search placeholder="请输入搜索关键词"
        v-model="keywords"
        disabled
        @click.native="openPage('searchPage')"/>
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      keywords: '',
    }
  },
  watch:{},
  computed:{},
  methods:{
    openPage(page){
      this.$router.push(page)
    }
  },
  created(){},
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
.searchBox {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  .van-search {
    flex: 1;
    background: none;
  }
  z-index: 2000;
}
</style>
<style>
.van-search {
  /* background: none !important; */
  background: #fff;
  height: 25px;
  margin:0 0.2rem;
}
.van-search > div{
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 25px !important;
  border: 1px solid #dcdcdc;
  background: #fff;
}
.van-search > div:active {
  background: #dcdcdc;
}
.van-cell__value {
  font-size: 14px !important;
}
</style>