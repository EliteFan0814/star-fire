<template>
  <div>
    <!-- 转拍五按钮 -->
    <div class="hall">
      <van-grid :border="false">
        <van-grid-item :text="item.name" @click="gridClick(item)" :key="index" v-for="(item, index) in titleList">
          <div class="img_div">
            <img :src="item.img" alt="">
          </div>
          <div class="grid_div">{{item.name}}</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      titleList: [
        {name: '购物商城', url: 'mall', img: require('@/assets/index/i_gwsc.png')},
        {name: '代理升级', url: 'Upgrade', img: require('@/assets/index/i_dlsj.png')},
        {name: '升级审核', url: 'levelUp', img: require('@/assets/index/i_sjsh.png')},
        {name: '兑换专区', url: 'exchange', img: require('@/assets/index/i_dhzq.png')},
      ],
    }
  },
  methods: {
    // 点击快捷按钮
    gridClick(item) {
      this.$router.push({name: item.url})
    },
  },
}
</script>
<style lang="scss" scoped>
.hall {
  padding: 0 .533333rem;
  height: 2.5rem;
  border-bottom: 8px solid #f5f5f5;
  .img_div {
    height: 2rem;
    position: relative;
    height: 1.2rem;
    img {
      float: left;
      width: .96rem;
      height: .96rem;
    }
  }
  .grid_div {
    line-height: 0.4rem;
    font-size: .3rem;
  }
}
</style>