<template>
  <div class="wrapper_index_banner">
    <div class="banner">
      <van-swipe :autoplay="3000"
        indicator-color="white"
        @change="bannerChange">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item.picurl" alt="">
        </van-swipe-item>
      </van-swipe>
      <!-- <div class="bannerIndicator">
        <span v-for="(item,index) in bannerList.length" :class="index == indicatorIndex ? 'red' : ''" :key="index"></span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    bannerList:{
      type:Array,
      default: () => {
        []
      }
    }
  },
  data(){
    return {
      indicatorIndex:0
    }
  },
  watch:{},
  computed:{},
  methods:{
    bannerChange(e){
      this.indicatorIndex = e
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.banner{
  .van-swipe{
    height: 4.8rem;
    border-radius: 5px;
    // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  }
  .bannerIndicator{
    text-align: center;
    margin-top: 0.9rem;
    border: 1px solid;
    span{
      display: inline-block;
      width: 2.9rem;
      height: 0.3rem;
      background: #d1d1d1;
      margin-right: 1rem;
      &:last-child{
        margin: 0;
      }
    }
    .red{
      background: #ff5f5f;
    }
  }
}
.van-swipe-item{
  img{
    width: 100%;
    height: 100%;
  }
}
</style>