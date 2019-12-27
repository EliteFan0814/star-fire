<template>
  <div class="wrapper_notice_Banner">
    <div class="nitoceBanner">
      <div class="nifirst">
        <img src="@/assets/index/i_gg.png" alt="">
        <div class="fenge"></div>
      </div>
      <div class="nitoceTitle">
        <van-swipe style="height: .6rem;"
          :touchable="false"
          vertical
          :autoplay="2000"
          :show-indicators="false">
          <van-swipe-item v-for="(item,index) in theArticleList"
            :key="index">
            <div class="titleNt">{{item.title}}</div></van-swipe-item>
        </van-swipe>
      </div>
      <span class="spantitle" @click="openPage('notice')">更多</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    theArticleList: {
      type: Array,
      default: () => {
        
      }
    }
  },
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    openPage(page) {
      this.$router.push(page)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.nitoceBanner {
  border-bottom: 1px solid #f5f5f5;
  padding: 0.3rem 0.533333rem;
  display: flex;
  align-items: center;
  font-size: .346667rem;
  color: #333;
  .nifirst {
    display: flex;
    width: 2.1rem;
    img {
      width: auto;
      height: .48rem;
    }
    .fenge {
      width: .02rem;
      height: .48rem;
      background: #40a3ff;
      margin: 0 .2rem;
    }
  }
  .nitoceTitle {
    height: .54rem;
    flex: 1;
    .titleNt {
      height: .54rem;;
      line-height: .6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .spantitle {
    line-height: .6rem;
    width: 1rem;
    text-align: right;
  }
}
</style>