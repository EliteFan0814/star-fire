<template>
  <div class="con">
    <div @click="jumpTo('index')">
      <img v-if="cardno == 0" src="@/assets/tabbar/1a.png" alt="">
      <img v-else src="@/assets/tabbar/1.png" alt="">
      <span>商城</span>
    </div>
    <div @click="jumpTo('levelUp')">
      <img v-if="cardno == 1" src="@/assets/tabbar/2a.png" alt="">
      <img v-else src="@/assets/tabbar/2.png" alt="">
      <span>升级审核</span>
    </div>
    <div @click="jumpTo('car')">
      <img v-if="cardno == 2" src="@/assets/tabbar/3a.png" alt="">
      <img v-else src="@/assets/tabbar/3.png" alt="">
      <span>购物车</span>
    </div>

    <div @click="jumpTo('ProfileIndex')">
      <img v-if="cardno == 3" src="@/assets/tabbar/4a.png" alt="">
      <img v-else src="@/assets/tabbar/4.png" alt="">
      <span>个人中心</span>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    cardno: {
      type: Number
    }
  },
  data() {
    return{}
  },
 
  watch: {
 
  },
  methods: {
    jumpTo(url) {
      if(this.$route.name != url)
        this.$router.push({name: url})
    }
  },
  created() {},
  mounted(){
  }
}
</script>
<style lang="scss" scoped>
.con {
  position: fixed;
  background: #fff;
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border-top: 1px solid #f5f5f5;
  font-size: .266667rem;
  padding: 0 .4rem;
  > div {
    height: 36px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-height: .586667rem;
    max-width: .586667rem;
    width: auto;
  }
}

.none {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
