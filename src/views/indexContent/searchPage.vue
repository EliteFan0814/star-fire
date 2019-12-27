<template>
  <div class="wrapper_index_hrader">
    <div class="searchBox">
      <div @click="jumpPage">
        <van-icon name="arrow-left" class="searchBack" size="18"/>
      </div>
      <van-search placeholder="请输入搜索关键词"
        v-model="keywords"
        show-action
        @search="onSearch">
          <div slot="action" @click="onSearch">搜索</div>
      </van-search>
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
    jumpPage() {
      this.$router.go(-1)
    },
    onSearch(){
      if(this.keywords == '') {
        return this.$toast('请输入关键字')
      }
      this.$router.push({
        name: 'searchList',
        query: {name: this.keywords}
      })
    }
  },
  created(){},
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
.searchBox {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  margin:0 12px;
  .searchBack {
    width: 25px;
    line-height: 50px;
  }
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
  padding: 0;
}
.van-search > div{
  height: 25px;
  display: flex;
  align-items: center;
  border-radius: 25px !important;
  border: 1px solid #dcdcdc;
  background: #fff;
}
.van-cell__value {
  font-size: 14px !important;
}
</style>